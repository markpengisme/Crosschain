let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'Hospital-BridgeNode-Two';
config.myIP = '127.0.0.1';
config.myApiPort = '3010';
config.myAccountAddress = '0xfe98d6e761e11e9752b08c655910256899bf366a'; 
config.myChainID = '9545';
config.myPort = 3010;
config.relayChainID = '8545';

// web3 provider
config.web3HttpProvider = 'http://localhost:42001'; //rpc port
config.web3WsProvider = 'ws://localhost:43001'; // web socket port

module.exports = config;