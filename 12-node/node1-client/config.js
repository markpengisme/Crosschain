let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'CareCenter-One';
config.myIP = 'http://localhost:3001';
config.myAccountAddress = '0xdfc31aa6c4cb2aa90c6e59bf7bfc78f34c5c6046'; 
config.myChainID = '7545';
config.myPort = 3001;
config.relayChainID = '8545';

// web3 provider
config.web3HttpProvider = 'http://localhost:22000'; //rpc port
config.web3WsProvider = 'ws://localhost:23000'; // web socket port

module.exports = config;