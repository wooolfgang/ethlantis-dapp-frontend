pragma solidity ^0.4.2;

import "./Ownable.sol";

contract MatchFactory is Ownable {

  event NewMatch(uint64 startTime, uint32 id, bytes8 teamA, bytes8 teamB);
  event CancelMatch(uint32 matchId, bool withdrawable, bool canceled, bool bettable);

  struct Match {
    uint64 startTime;
    uint32 matchId;
    uint32 id;
    uint32 teamATotalBets;
    uint32 teamBTotalBets;
    bytes8 teamA;
    bytes8 teamB;
    bytes8 gameType;
    bytes8 winner;
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
    require(_teamA == bytes32(bytes8(_teamA)));
    require(_teamB == bytes32(bytes8(_teamB)));
    require(_gameType == bytes32(bytes8(_gameType)));

    uint id = matches.push(Match({
      startTime: uint64(_startTime),
      matchId: uint32(_matchId),
      id: uint32(matches.length - 1),
      teamATotalBets: 0,
      teamBTotalBets: 0,
      teamA: bytes8(_teamA),
      teamB: bytes8(_teamB),
      gameType: bytes8(_gameType),
      winner: "",
      withdrawable: false,
      canceled: false,
      bettable: true
    })) - 1;
    bytes32 uniqueId = keccak256(_matchId, _gameType);
    uniqueIdToMatchesArrayId[uniqueId] = uint32(id);
    NewMatch(uint64(_startTime), uint32(id), bytes8(_teamA), bytes8(_teamB));
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

  function getMatchInfo(uint256 _matchId, bytes32 _gameType) 
    public 
    view 
    returns (
      uint32, 
      uint64, 
      uint32, 
      bytes8,
      bytes8, 
      bytes8, 
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
      bytes8,
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
}
