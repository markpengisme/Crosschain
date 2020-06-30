let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'CareCenter-BridgeNode-One';
config.myIP = '127.0.0.1';
config.myApiPort = '3002';
config.myAccountAddress = '0xa93278ed1977727474ccd5b0d4ac313037d7f8a6'; 
config.myChainID = '7545';
config.relayChainID = '8545';

// web3 provider
config.web3HttpProvider = 'http://localhost:22001'; //rpc port
config.web3WsProvider = 'ws://localhost:23001'; // web socket port

module.exports = config;
