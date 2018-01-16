var DataStore = artifacts.require("./DataStore.sol");

contract('DataStore', function(accounts) {
  it("should have accounts", function() {
    assert.equal(accounts.length >= 2, true, "We need at lease 2 accounts to run the tests.")
  })

  it("should initialize with no Data", function() {
    return DataStore.deployed().then(function(instance) {
      return instance.GetMapCount.call();
    }).then(function(mapCount) {
      assert.equal(mapCount.valueOf(), 0, "MapCount should be 0 at start");
    });
  });

  it("should add Data", function() {
    var ds;
    var account_one = accounts[0];
    var account_two = accounts[1];
    var account_one_starting_balance;
    var account_two_starting_balance
    var amount = 5;

    return DataStore.deployed().then(function(instance) {
      ds = instance;
    //   return ds.getBalance.call(account_one);
    // }).then(function(balance) {
    //   account_one_starting_balance = balance.toNumber();
    //   return ds.getBalance.call(account_two);
    // }).then(function(balance) {
    //   account_two_starting_balance = balance.toNumber();

      return ds.AddNewData(555, "Name5", "secret5", {from: account_one, to: account_two, value: web3.toWei(amount, 'ether')});
    }).then(function() {
      return ds.GetMapCount.call();
    }).then(function(mapCount) {
      assert.equal(mapCount.valueOf(), 1, "MapCount should be increased.");
      return ds.GetDataByNumber.call(0);    
    }).then(function(response){
      assert.equal(response[0].valueOf(), "Name5", "Data should be stored.");      

    //   return ds.getBalance.call(account_one);
    // }).then(function(balance) {
    //   account_one_ending_balance = balance.toNumber();
    //   return ds.getBalance.call(account_two);
    // }).then(function(balance) {
    //   account_two_ending_balance = balance.toNumber();
    //   assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    //   assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  })

});
