let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'CareCenter-BridgeNode-Three';
config.myIP = 'http://localhost:3004';
config.myAccountAddress = '0x406986b7f121e58453cff9950a27e75ba9d8ea82'; 
config.myChainID = '7545';
config.myPort = 3004;
config.relayChainID = '8545';

// web3 provider
config.web3HttpProvider = 'http://localhost:22003'; //rpc port
config.web3WsProvider = 'ws://localhost:23003'; // web socket port

module.exports = config;
