pragma solidity ^0.4.0;

contract Ubi {

    address public creator;
    address UbiAcc = 0xf17f52151EbEF6C7334FAD080c5704D77216b732;
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
        assert(UbiAcc.send(this.balance));
        return true;
    }
}
