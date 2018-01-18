pragma solidity ^ 0.4 .18;

contract UbiContract {

  address public creator;
  address UbiAccount = 0x627306090abaB3A6e1400e9345bC60c78a8BEf57;

  function() payable public {
  }

  function UbiContract() payable public {
    creator = msg.sender;
  }

  function kill() public {
    selfdestruct(creator);
  }

  function SendPaymentToContract() public payable returns(bool sufficient) {
    getCurrentAddress().transfer(msg.value);
    return true;
  }

  function SendPaymentToUbi() public payable returns(bool sufficient) {
    UbiAccount.transfer(msg.value);
    return true;
  }

  function getCurrentAddress() public view returns(address) {
    return this;
  }
}
