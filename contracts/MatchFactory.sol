pragma solidity ^0.4.2;

import "./Ownable.sol";

contract MatchFactory is Ownable {

  event NewMatch(uint id, bytes8 teamA, bytes8 teamB, uint startTime);
  event CancelMatch(uint matchId, bool withdrawable, bool canceled, bool bettable);

  struct Match {
    uint matchId;
    uint startTime;
    uint teamATotalBets;
    uint teamBTotalBets;
    bytes8 teamA;
    bytes8 teamB;
    bytes8 gameType;
    bytes8 winner;
    bool withdrawable;
    bool canceled;
    bool bettable;
    mapping (address => uint) teamABets;
    mapping (address => uint) teamBBets;
  }

  modifier afterTime(uint _timestamp) {
    require(now >= _timestamp);
    _;
  }

  Match[] public matches;
  mapping(bytes32 => uint) public uniqueIdToMatchesArrayId;

  function addMatch(
    uint _matchId, 
    uint _startTime, 
    bytes8 _teamA, 
    bytes8 _teamB, 
    bytes8 _gameType
  ) 
    external 
    onlyOwner 
    afterTime(_startTime) 
  {
    uint id = matches.push(Match({
      matchId: _matchId,
      startTime: _startTime,
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
    uniqueIdToMatchesArrayId[uniqueId] = id;
    NewMatch(id, _teamA, _teamB, _startTime);
  }

  function cancelMatch(uint _matchId, bytes8 _gameType) external onlyOwner {
    Match storage m = matches[getMatchId(_matchId, _gameType)];
    m.canceled = true;
    m.withdrawable = true;
    m.bettable = false;
    CancelMatch(m.matchId, m.withdrawable, m.canceled, m.bettable);
  }

  function getMatchesCount() public view returns (uint) {
    return matches.length;
  }

  function getMatchInfo(uint _matchId, bytes8 _gameType) 
    public 
    view 
    returns (uint, uint, bytes8, bytes8, bytes8, bytes8, bool, bool, bool) 
  {
    Match memory m = matches[getMatchId(_matchId, _gameType)];
    return (
      m.matchId,
      m.startTime,
      m.teamA, 
      m.teamB, 
      m.gameType, 
      m.winner, 
      m.withdrawable, 
      m.canceled, 
      m.bettable
    );
  }

  function getMatchId(uint _matchId, bytes8 _gameType) internal view returns (uint) {
    bytes32 uniqueId = keccak256(_matchId, _gameType);
    return uniqueIdToMatchesArrayId[uniqueId];    
  }
}
