const MatchFactory = artifacts.require('./MatchFactory.sol');
const MatchBetting = artifacts.require('./MatchBetting.sol');

module.exports = function (deployer) {
  deployer.deploy(MatchFactory);
  deployer.deploy(MatchBetting);
};
