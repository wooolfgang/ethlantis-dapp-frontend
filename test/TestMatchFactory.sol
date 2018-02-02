pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MatchFactory.sol";

contract TestMatchFactory {
  function testItAddsANewMatch() public {
    MatchFactory matchFactory = MatchFactory(DeployedAddresses.MatchFactory());
    matchFactory.addMatch(123, 1517462168, "Dignitas", "Potato", "Dota2");
    uint actual = matchFactory.getMatchesCount();
    uint expected = 5;
    Assert.equal(actual, expected, "Matches array should add a new match");
  }
}