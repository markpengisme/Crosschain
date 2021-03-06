let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'RelayChain-BridgeNode-Two';
config.myIP = '127.0.0.1';
config.myApiPort = '3006';
config.myAccountAddress = '0x1f33e7167f2938d80408f4c3d3507c927877b350'; 
config.myChainID = '8545';
config.childChainID = ['7545','9545'];

// web3 provider
config.web3HttpProvider = 'http://localhost:32001'; //rpc port
config.web3WsProvider = 'ws://localhost:33001'; // web socket port

module.exports = config;
