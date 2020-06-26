let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'Hospital-One';
config.myIP = 'http://localhost:3012';
config.myAccountAddress = '0x06de588f1a693fb6fdb6414242903b769d3d9a41'; 
config.myChainID = '9545';
config.myPort = 3012;
config.relayChainID = '8545';

// web3 provider
config.web3HttpProvider = 'http://localhost:42003'; //rpc port
config.web3WsProvider = 'ws://localhost:43003'; // web socket port

module.exports = config;