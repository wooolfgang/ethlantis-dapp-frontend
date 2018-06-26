const DataLayer = artifacts.require('./DataLayer.sol');

module.exports = function (deployer) {
  deployer.deploy(DataLayer);
};
