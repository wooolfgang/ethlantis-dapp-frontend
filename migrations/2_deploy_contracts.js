const MatchBetting = artifacts.require('./MatchBetting.sol');

module.exports = function (deployer) {
  deployer.deploy(MatchBetting);
};
