pragma solidity ^0.4.24;

contract DataLayer {

  struct Match {
    uint teamATotalBets;
    uint teamBTotalBets;
    uint256 startTime;
    uint32 matchId;
    uint32 id;
    bytes32 teamA;
    bytes32 teamB;
    bytes32 gameType;
    bytes32 winner;
    bool withdrawable;
    bool canceled;
    bool bettable;
    mapping (address => uint) teamABets;
    mapping (address => uint) teamBBets;
  }

  Match[] public matches;

  mapping(uint32 => uint32) public matchIdToId;
}