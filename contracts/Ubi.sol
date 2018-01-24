pragma solidity ^0.4.0;

contract Ubi {

    address public creator;

    function Ubi() payable public {
        creator = msg.sender;
    }

    function kill() public returns (bool result){
        selfdestruct(creator);
        return true;
    }

    function SendPaymentToContract() public payable returns(bool result) {
        return true;
    }

    function SendPaymentToUbi() public returns(bool result){
        assert(creator.send(this.balance));
        return true;
    }
}
