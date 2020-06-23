let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'Hospital-BridgeNode-Two';
config.myIP = 'http://localhost:3010';
config.myAccountAddress = '0x8bf842ad24254af5d39a913cc87238f4b3510dda'; 
config.myChainID = '9545';
config.myPort = 3010;
config.relayChainID = '8545';

// web3 provider
config.web3HttpProvider = 'http://localhost:42001'; //rpc port
config.web3WsProvider = 'ws://localhost:43001'; // web socket port

module.exports = config;