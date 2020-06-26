let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'Hospital-BridgeNode-One';
config.myIP = 'http://localhost:3009';
config.myAccountAddress = '0x95c0abb132fef71d6351cfde3daecc06b5f14d08'; 
config.myChainID = '9545';
config.myPort = 3009;
config.relayChainID = '8545';

// web3 provider
config.web3HttpProvider = 'http://localhost:42000'; //rpc port
config.web3WsProvider = 'ws://localhost:43000'; // web socket port

module.exports = config;