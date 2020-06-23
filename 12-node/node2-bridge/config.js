let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'CareCenter-BridgeNode-One';
config.myIP = 'http://localhost:3002';
config.myAccountAddress = '0x149f65589a0a295896f997c1e7764b6cb2d4f1b4'; 
config.myChainID = '7545';
config.myPort = 3002;
config.relayChainID = '8545';

// web3 provider
config.web3HttpProvider = 'http://localhost:22001'; //rpc port
config.web3WsProvider = 'ws://localhost:23001'; // web socket port

module.exports = config;
