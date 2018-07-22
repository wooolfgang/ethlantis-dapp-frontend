pragma solidity ^0.4.24;

/* 
  the topmost contract
  matches are stored in here in order for the child contracts 
  to have access to the data layer
*/

contract DataLayer {

  struct Match {
    uint teamATotalBets;
    uint teamBTotalBets;
    uint256 startTime;
    uint256 matchId;
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

  mapping(uint256 => uint256) public matchIdToId;
}