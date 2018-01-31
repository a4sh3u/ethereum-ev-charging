## Ethereum EV Charging

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
- compile contracts: `truffle compile --all`
- deploy to blockchain: `truffle migrate --reset`
- start Frontend: `npm run dev`
- open browser at http://localhost:8080/
- take a private key from the Ganache accounts and add it to Metamask to act as your own account.

### Charging Station simulation
- Use the repo [Simple Light Bulb](https://github.com/a4sh3u/simple-bulb-switch) to run the light bulb application as simulated charging station.
- The bulb will `switch on` during the charging period and `switch off` after charging period.

### Test (Not updated)
- run tests with `truffle test`

### Use
- fill in the form and click add. Considering that you already added your blockchain account to Metamask, it will popup a transaction window that will show a transfer of 10ETH. Approve the transfer and Ganache app will do the mining automatically.

### Debug (Not updated)
- to interact with blockchain and contracts run `truffle console`
    - grab the contract: `Ubi.deployed().then(function(instance) { d =instance })`
    - run a transaction: `WIP`
