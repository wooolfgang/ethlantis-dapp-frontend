pragma solidity ^0.4.24;

import "./Ownable.sol";
import "./DataSource.sol";

contract MatchFactory is DataSource {

  event NewMatch(uint256 startTime, uint32 id, bytes32 teamA, bytes32 teamB);
  event CancelMatch(uint256 matchId, bool withdrawable, bool canceled, bool bettable);

  modifier beforeStart(uint256 _timestamp) {
    require(now < _timestamp);
    _;
  }

  function addMatch(
    uint256 _startTime, 
    uint256 _matchId, 
    bytes32 _teamA, 
    bytes32 _teamB, 
    bytes32 _gameType
  ) 
    external 
    onlyOwner 
    beforeStart(_startTime) 
  {
    require(_matchId == uint256(uint32(_matchId)));
    require(matchIdToId[_matchId] == 0);    

    uint id = matches.push(Match({
      startTime: _startTime,
      matchId: _matchId,
      id: uint32(matches.length),
      teamATotalBets: 0,
      teamBTotalBets: 0,
      teamA: _teamA,
      teamB: _teamB,
      gameType: _gameType,
      winner: "",
      withdrawable: false,
      canceled: false,
      bettable: true
    })) - 1;
    
    matchIdToId[_matchId] = uint32(id);
    emit NewMatch(_startTime, uint32(id), _teamA, _teamB);
  }

  function cancelMatch(uint256 _matchId) external onlyOwner {
    Match storage m = matches[matchIdToId[_matchId]];
    m.canceled = true;
    m.withdrawable = true;
    m.bettable = false;
    emit CancelMatch(m.matchId, m.withdrawable, m.canceled, m.bettable);
  }

  function getMatchesCount() public view returns (uint) {
    return matches.length;
  }

  // The getters for the for the Matches struct has been separated into different 
  // functions because of solidity's 16 local variable limitation
  function getMatchesInfo(uint256[] indexes) 
    external 
    view 
    returns (
      uint32[],
      uint256[],
      uint256[],
      bytes32[],
      bytes32[],
      bytes32[]
    ) {

      uint32[] memory ids = new uint32[](indexes.length);
      uint256[] memory startTimes = new uint256[](indexes.length);
      uint256[] memory matchIds = new uint256[](indexes.length);
      bytes32[] memory teamAs = new bytes32[](indexes.length);
      bytes32[] memory teamBs = new bytes32[](indexes.length);
      bytes32[] memory gameTypesArray = new bytes32[](indexes.length);

      for (uint i = 0; i < indexes.length; i++) {
        ids[i] = matches[indexes[i]].id;
        startTimes[i] = matches[indexes[i]].startTime;
        matchIds[i] = matches[indexes[i]].matchId;
        teamAs[i] = matches[indexes[i]].teamA;
        teamBs[i] = matches[indexes[i]].teamB;
        gameTypesArray[i] = matches[indexes[i]].gameType;
      }

      return (ids, startTimes, matchIds, teamAs, teamBs, gameTypesArray);
  }

  function getMatchesStatus(uint256[] indexes) 
    external 
    view 
    returns (
      bool[],
      bool[],
      bool[]
    ) {

      bool[] memory withdrawableArray = new bool[](indexes.length);
      bool[] memory canceledArray = new bool[](indexes.length);
      bool[] memory bettableArray = new bool[](indexes.length);

      for (uint i = 0; i < indexes.length; i++) {
        withdrawableArray[i] = matches[indexes[i]].withdrawable;
        canceledArray[i] = matches[indexes[i]].canceled;
        bettableArray[i] = matches[indexes[i]].bettable;
      }

      return (withdrawableArray, canceledArray, bettableArray);
  }

  function getMatchesResult(uint256[] indexes) 
    external 
    view 
    returns (
      bytes32[],
      uint[],
      uint[]
    ) {

      bytes32[] memory winners = new bytes32[](indexes.length);
      uint[] memory teamATotalBets = new uint[](indexes.length);
      uint[] memory teamBTotalBets = new uint[](indexes.length);

      for (uint i = 0; i < indexes.length; i++) {
        winners[i] = matches[indexes[i]].winner;
        teamATotalBets[i] = matches[indexes[i]].teamATotalBets;
        teamBTotalBets[i] = matches[indexes[i]].teamBTotalBets;
      }

      return (winners, teamATotalBets, teamBTotalBets);
  }

}
