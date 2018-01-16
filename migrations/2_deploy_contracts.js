var DataStore = artifacts.require("./DataStore.sol");

module.exports = function(deployer) {
  deployer.deploy(DataStore);
};
