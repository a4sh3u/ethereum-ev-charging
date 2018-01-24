// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import {
  default as Web3
} from 'web3';
import {
  default as contract
} from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
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

    // Bootstrap the Ubi abstraction for Use.
    Ubi.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts. Make sure MetaMask Chrome extension is installed.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      accounts = accs;
      account = accounts[0];
      web3.eth.defaultAccount = account;
      // self.buildContracts();

      //self.refreshMapCount();
    });
  },

  // buildContracts() {
  //   let contracts = {};
  //   let meta;

  //   let {contract_name = ''} = ubi_artifacts;
  //   meta = contract(ubi_artifacts);
  //   meta.setProvider(web3.currentProvider);
  //   meta.defaults({from: web3.eth.coinbase});
  //   contracts[contract_name] = meta;

  //   return contracts;
  // },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  pay: function() {
    var self = this;

    this.setStatus("Initiating transaction... (please wait)");

    var ds;
    Ubi.deployed().then(function(instance) {
      ds = instance;
      return ds.SendPaymentToContract({
        from: account,
        value: web3.toWei(self.amount.price, 'ether')
      }) // {from: account}  is needed to perform transactions !!!
    }).then(function() {
      console.log("Transaction to contract complete!");
      // curl -X POST -H "Content-Type: application/json" -d '{"charging": "ON"}' https://hookb.in/vaP3l3Rm
      self.postToSocket("ON");

      setTimeout(function() {
        self.postToSocket("OFF");

        console.log("Stopping socket");
        return ds.SendPaymentToUbi({from: account}).then(function(e) {
          console.log(e);
          console.log("transferred from contract to ubi");
        }).catch(function(e) {
          console.log(e);
          console.log("cannnot transfer from contract to ubi");
        })
      }, self.amount.time * 1000);

      //self.refreshMapCount();
    }).catch(function(e) {
      console.log(e);
      console.log("Error transfering; see log.");
    });
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
    xhr.open("POST", 'https://hookb.in/vaP3l3Rm', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function() { //Call a function when the state changes.
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here.
      }
    }
    xhr.send("{'charging': " + action + "}");
    // xhr.send('string');
    // xhr.send(new Blob());
    // xhr.send(new Int8Array());
    // xhr.send({ form: 'data' });
    // xhr.send(document);
  }
};


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear, ensure you've configured that source properly. If using MetaMask, see the following link. http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});
