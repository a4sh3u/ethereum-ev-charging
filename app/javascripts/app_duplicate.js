import "../stylesheets/app.css";
import {
  default as Web3
} from 'web3';
import {
  default as contract
} from 'truffle-contract';


import ubi_artifacts from '../../build/contracts/Ubi.json'

var Ubi = contract(ubi_artifacts);


var accounts;
var account;

window.App = {
  amount: {
    price: 0,
    time: 0
  },
  start: function() {
    var self = this;
    Ubi.setProvider(new Web3.providers.HttpProvider("127.0.0.1:7545"));
    web3.eth.defaultAccount = "0x01809A9D436Ff16736203c3689aEBe8487C09F01";
    var private_key = "2572daa5583eca8bfc2435b9da417e729b9b1c0a5fd029793f6c141bc9ca1e00";
    };
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  pay: function() {
    var self = this;
    this.setStatus("Initiating transaction... (please wait)");
    var txn = {
      "to": "0xc720B0E54fd6Dd08b591946fc2452f1475FF405a",
      "value": web3.toWei(self.amount.price, 'ether')
    }
    var transaction = new EthereumTx(txn)
    transaction.sign( Buffer.from(private_key, 'hex') )
    var serializedTransaction = transaction.serialize()
    const transactionId = web3.eth.sendRawTransaction('0x' + serializedTransaction.toString('hex') )
  },

  onValueChangeHandler: function(value) {
    console.log(value);

    this.amount.time = value;
    this.amount.price = (0.3 * parseInt(value));


    document.getElementById('timeField').innerText = this.amount.time + " seconds";
    document.getElementById('etherField').innerText = this.amount.price + " ETH";
  },

  postToSocket: function(action) {
    var xhr = new XMLHttpRequest();
    if (action == 'ON') {
      xhr.open("GET", 'http://localhost:8081/stateOn', true);
      xhr.send();
      console.log(action);
      console.log(xhr);
    }
    if (action == 'OFF') {
      xhr.open("GET", 'http://localhost:8081/stateOff', true);
      xhr.send();
      console.log(action);
      console.log(xhr);
    }
  }
};


window.addEventListener('load', function() {
  App.start();
});
