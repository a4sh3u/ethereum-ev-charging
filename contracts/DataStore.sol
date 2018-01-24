pragma solidity ^0.4.0;

contract DataStore {

    address public creator;

    function DataStore() payable public {
        creator = msg.sender;
    }

    function kill() public returns (bool result){
        assert(creator.send(this.balance));
        return true;
    }

    function SendPaymentToContract() public payable returns(bool result) {
        return true;
    }

    function SendPaymentToUbi() public view returns(address result){
        return creator;
    }
}
