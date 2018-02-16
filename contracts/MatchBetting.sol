pragma solidity ^0.4.2;

import "./MatchFactory.sol";

contract MatchBetting is MatchFactory {

  event NewBet(address user, uint amount, bytes32 teamChoice, uint teamATotalBets, uint teamBTotalBets);
  event TeamChange(address user, uint amount, bytes32 newTeam, uint teamATotalBets, uint teamBTotalBets);
  event NewFee(uint8 newFee);

  uint public minBet = 5000000000000000 wei;
  uint public maxBet = 30000000000000000000 wei;
  
  uint8 public constant MAX_FEE_PERCENTAGE = 6;
  uint8 public feePercentage = 3;

  function bet(bytes32 _matchHash, bytes32 _teamChoice) external payable {
    Match storage m = matches[hashToMatchId[_matchHash]];
    uint amount = msg.value * 1 wei;
    
    require(now < m.startTime);
    require(m.bettable);
    require(m.teamA == _teamChoice || m.teamB == _teamChoice);

    if (m.teamA == _teamChoice && m.teamBBets[msg.sender] == 0) {
      require(m.teamABets[msg.sender] + amount <= maxBet);
      require(m.teamABets[msg.sender] + amount >= minBet);  
      m.teamABets[msg.sender] += amount;
      m.teamATotalBets += amount;
    } else if (m.teamB == _teamChoice && m.teamABets[msg.sender] == 0) {
      require(m.teamBBets[msg.sender] + amount <= maxBet);
      require(m.teamABets[msg.sender] + amount >= minBet);
      m.teamBBets[msg.sender] += amount;
      m.teamBTotalBets += amount;
    } else { 
      revert();
    }

    NewBet(msg.sender, amount, _teamChoice, m.teamATotalBets, m.teamBTotalBets);
  }

  function changeTeam(bytes32 _matchHash, bytes32 _teamChoice) external {
    Match storage m = matches[hashToMatchId[_matchHash]];
    uint amount;

    require(now < m.startTime);
    require(m.bettable);

    if (_teamChoice == m.teamA && m.teamABets[msg.sender] == 0 && m.teamBBets[msg.sender] != 0) {
      m.teamABets[msg.sender] = m.teamBBets[msg.sender];
      amount = m.teamBBets[msg.sender];
      m.teamBTotalBets -= m.teamBBets[msg.sender];
      m.teamATotalBets += m.teamBBets[msg.sender];      
      m.teamBBets[msg.sender] = 0;
    } else if (_teamChoice == m.teamB && m.teamBBets[msg.sender] == 0 && m.teamABets[msg.sender] != 0) {
      m.teamBBets[msg.sender] = m.teamABets[msg.sender];
      amount = m.teamABets[msg.sender];
      m.teamATotalBets -= m.teamABets[msg.sender];
      m.teamBTotalBets += m.teamABets[msg.sender];
      m.teamABets[msg.sender] = 0;
    } else {
      revert();
    }

    TeamChange(msg.sender, amount, _teamChoice, m.teamATotalBets, m.teamBTotalBets);
  }

  function setFee(uint256 _newFeePercentage) external onlyOwner {
    require(_newFeePercentage == uint8(_newFeePercentage));
    require(_newFeePercentage <= MAX_FEE_PERCENTAGE);
    feePercentage = uint8(_newFeePercentage);
    NewFee(uint8(_newFeePercentage));
  }

  function getUserBet(bytes32 _matchHash, bytes32 _teamChoice)
    public 
    view 
    returns (
      uint amount
  ) {
    Match storage m = matches[hashToMatchId[_matchHash]];
    
    require(m.teamA == _teamChoice || m.teamB == _teamChoice);
    
    if (_teamChoice == m.teamA) {
      amount = m.teamABets[msg.sender];
    } else if (_teamChoice == m.teamB) {
      amount = m.teamBBets[msg.sender];
    }

    return amount;
  }
}