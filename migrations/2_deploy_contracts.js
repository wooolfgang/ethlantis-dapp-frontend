const MatchFactory = artifacts.require('./MatchFactory.sol');

module.exports = function (deployer) {
  deployer.deploy(MatchFactory);
};
