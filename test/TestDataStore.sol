pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/DataStore.sol";

contract TestDataStore {
  function testInitialSetup() public {
    DataStore ds = DataStore(DeployedAddresses.DataStore());

    Assert.equal(uint(ds.GetMapCount()), uint(0), "MapCount should be 0 at start.");
  }

  function testAddNewData() public {
    // DataStore ds = DataStore(DeployedAddresses.DataStore());  // on deployed DataStore contract
    DataStore ds = new DataStore(); //on new DataStore contract

    Assert.equal(ds.AddNewData(111, "Name1", "secret1"), true, "AddNewData should create a new Data in MapData");
    Assert.equal(uint(ds.GetMapCount()), uint(1), "After adding new Data, MapCount should increase.");
    // Assert.NotNull(ds.GetDataByNumber(111), "Added data should be in the DataMap");
  }
}