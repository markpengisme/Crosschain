let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'CareCenter-BridgeNode-Two';
config.myIP = 'http://localhost:3003';
config.myAccountAddress = '0x281c5cb496a751305b0dd7907320ee55836095c6'; 
config.myChainID = '7545';
config.myPort = 3003;
config.relayChainID = '8545';

// web3 provider
config.web3HttpProvider = 'http://localhost:22002'; //rpc port
config.web3WsProvider = 'ws://localhost:23002'; // web socket port

module.exports = config;
