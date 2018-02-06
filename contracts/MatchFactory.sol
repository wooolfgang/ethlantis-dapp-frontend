pragma solidity ^0.4.2;

import "./Ownable.sol";

contract MatchFactory is Ownable {

  event NewMatch(uint64 startTime, uint32 id, bytes32 teamA, bytes32 teamB);
  event CancelMatch(uint32 matchId, bool withdrawable, bool canceled, bool bettable);

  struct Match {
    uint64 startTime;
    uint32 matchId;
    uint32 id;
    uint32 teamATotalBets;
    uint32 teamBTotalBets;
    bytes32 teamA;
    bytes32 teamB;
    bytes32 gameType;
    bytes32 winner;
    bool withdrawable;
    bool canceled;
    bool bettable;
    mapping (address => uint16) teamABets;
    mapping (address => uint16) teamBBets;
  }

  modifier afterTime(uint256 _timestamp) {
    require(now >= _timestamp);
    _;
  }

  Match[] public matches;
  mapping(bytes32 => uint32) public uniqueIdToMatchesArrayId;

  function addMatch(
    uint256 _startTime, 
    uint256 _matchId, 
    bytes32 _teamA, 
    bytes32 _teamB, 
    bytes32 _gameType
  ) 
    external 
    onlyOwner 
    afterTime(_startTime) 
  {
    require(_startTime == uint256(uint64(_startTime)));
    require(_matchId == uint256(uint32(_matchId)));

    uint id = matches.push(Match({
      startTime: uint64(_startTime),
      matchId: uint32(_matchId),
      id: uint32(matches.length - 1),
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
    bytes32 uniqueId = keccak256(_matchId, _gameType);
    uniqueIdToMatchesArrayId[uniqueId] = uint32(id);
    NewMatch(uint64(_startTime), uint32(id), _teamA, _teamB);
  }

  function cancelMatch(uint256 _matchId, bytes32 _gameType) external onlyOwner {
    Match storage m = matches[getMatchId(_matchId, _gameType)];
    m.canceled = true;
    m.withdrawable = true;
    m.bettable = false;
    CancelMatch(m.matchId, m.withdrawable, m.canceled, m.bettable);
  }

  function getMatchesCount() public view returns (uint) {
    return matches.length;
  }

  function getMatchId(uint256 _matchId, bytes32 _gameType) public view returns (uint32) {
    bytes32 uniqueId = keccak256(_matchId, _gameType);
    return uniqueIdToMatchesArrayId[uniqueId];    
  }

  // The getters for the for the Matches struct has been separated into different 
  // functions because of solidity's 16 local variable limitation

  function getMatchInfo(uint256 _matchId, bytes32 _gameType) 
    public 
    view 
    returns (
      uint32, 
      uint64, 
      uint32, 
      bytes32,
      bytes32, 
      bytes32, 
      bool, 
      bool, 
      bool
    ) {
    Match memory m = matches[getMatchId(_matchId, _gameType)];
    return (
      m.id,      
      m.startTime,
      m.matchId,
      m.teamA, 
      m.teamB, 
      m.gameType, 
      m.withdrawable, 
      m.canceled, 
      m.bettable
    );
  }

  function getMatchResults(uint256 _matchId, bytes32 _gameType) 
    public 
    view 
    returns (
      uint32,
      bytes32,
      uint32,
      uint32
    ) {
    Match memory m = matches[getMatchId(_matchId, _gameType)];
    return (
      m.id,
      m.winner,
      m.teamATotalBets,
      m.teamBTotalBets
    );   
  }

  function getMatchesInfo(uint256[] indexes) 
    external 
    view 
    returns (
      uint32[],
      uint64[],
      uint32[],
      bytes32[],
      bytes32[],
      bytes32[]
    ) {

      uint32[] memory ids = new uint32[](indexes.length);
      uint64[] memory startTimes = new uint64[](indexes.length);
      uint32[] memory matchIds = new uint32[](indexes.length);
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
      uint32[],
      uint32[]
    ) {

      bytes32[] memory winners = new bytes32[](indexes.length);
      uint32[] memory teamATotalBets = new uint32[](indexes.length);
      uint32[] memory teamBTotalBets = new uint32[](indexes.length);

      for (uint i = 0; i < indexes.length; i++) {
        winners[i] = matches[indexes[i]].winner;
        teamATotalBets[i] = matches[indexes[i]].teamATotalBets;
        teamBTotalBets[i] = matches[indexes[i]].teamBTotalBets;
      }

      return (winners, teamATotalBets, teamBTotalBets);
  }

}
