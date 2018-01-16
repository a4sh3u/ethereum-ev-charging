## Blockchain Ethereum DApp

### Setup
- install Node (developed with v8.9.2)
- install Truffle package, the solidity compiler and deployer: `npm install -g truffle`
- install all dependencies: `npm install`
- start a local Ethereum blockchain server using one of the avaliable methods:
    - using Ganache app: https://github.com/trufflesuite/ganache
    - using docker Ganache image: `docker run -d -p 8545:8545 trufflesuite/ganache-cli:latest -a 10 --debug`
    - using Ganache-cli (ex. TestRPC): `npm install -g ganache-cli` and `ganache-cli -a 10 --debug`
- install chrome extension Metamask: https://metamask.io/

### Deploy and start app
- take an account address from the blockchain accounts add add it to `DataStore#ReceivingAccount` to act as the business reciver account.
- compile contracts: `truffle compile`
- deploy to blockchain: `truffle migrate --reset`
- start Frontend: `npm run dev`
- open browser at http://localhost:8080/
- take a private key from the Ganache accounts and add it to Metamask to act as your own account.

### Test 
- run tests with `truffle test`

### Use
- fill in the form and click add. Considering that you already added your blockchain account to Metamask, it will popup a transaction window that will show a transfer of 10ETH. Approve the transfer and Ganache app will do the mining automatically.

### Debug
- to interact with blockchain and contracts run `truffle console`
    - grab the contract: `DataStore.deployed().then(function(instance) { d =instance })`
    - run a transaction: `d.AddNewData("222", "Name2", "Secret2", {from: "0x821aEa9a577a9b44299B9c15c88cf3087F3b5544", to:"0x627306090abaB3A6e1400e9345bC60c78a8BEf57", value: web3.toWei(11, 'ether'), gasLimit: 21000, gasPrice: 20000000000})`