pragma solidity ^0.4.18;

contract DataStore {

    address public creator;
    address UbiAccount = 0x627306090abaB3A6e1400e9345bC60c78a8BEf57;  //read from properties file
    /* uint Price = 10; //read from properties file */

    /* struct Data {
        string Name;
        uint Id;
        uint PreviousId;
        uint Timestamp;
        string Secret;
    } */

    /* mapping(uint => Data) Map;
    uint16 MapCount=0; */

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event LogFundsReceived(address sender, uint amount);
    event LogFundsSent(address receiver, uint amount);

    function() payable public {
        LogFundsReceived(msg.sender, msg.value);
    }

    function DataStore() payable public {
        creator = msg.sender;
        LogFundsReceived(msg.sender, msg.value);
    }

    function kill() public {
        selfdestruct(creator);
    }

    /* function sendAmount(address target, uint256 amount) payable public {
        target.transfer(amount);
        LogFundsSent(target, amount);
    } */

    /**
     * Call example:
     * ds.AddNewData("222", "Name2", 80, "Secret2", {from: "0x821..", to:"0x627..", value: web3.toWei(11, 'ether'), gasLimit: 21000, gasPrice: 20000000000})
     */
    function SendPaymentToContract() public payable returns(bool sufficient) {
        /* Data memory newData;
        newData.Id = Id;
        newData.Name = Name;
        newData.Secret = Secret;
        newData.Timestamp = now; */

        /* if (MapCount != 0) {
            newData.PreviousId = Map[MapCount-1].Id;
        }

        Map[MapCount] = newData;
        MapCount++; */

        // ReceivingAccount.transfer(Price);
        //UbiAccount.transfer(msg.value);
        getCurrentAddress().transfer(msg.value);
        // Transfer(msg.sender, ReceivingAccount, Price);
        LogFundsSent(UbiAccount, msg.value);

        return true;
    }

    function SendPaymentToUbi() public payable returns(bool sufficient) {
        /* Data memory newData;
        newData.Id = Id;
        newData.Name = Name;
        newData.Secret = Secret;
        newData.Timestamp = now; */

        /* if (MapCount != 0) {
            newData.PreviousId = Map[MapCount-1].Id;
        }

        Map[MapCount] = newData;
        MapCount++; */

        // ReceivingAccount.transfer(Price);
        //UbiAccount.transfer(msg.value);
        //Transfer(getCurrentAddress(), UbiAccount,  msg.value);
        selfdestruct(UbiAccount);
        LogFundsSent(UbiAccount, msg.value);

        return true;
    }

    function getCurrentAddress() public view returns (address){
      return this;
    }
/*
    function GetMapCount() public view returns (uint16) {
        return MapCount;
    }

    function GetDataByNumber(uint16 number) public view returns (string, uint, uint, uint, string) {
        return (Map[number].Name, Map[number].Id, Map[number].PreviousId, Map[number].Timestamp, Map[number].Secret);
    } */
}
