let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'RelayChain-BridgeNode-One';
config.myIP = '127.0.0.1';
config.myApiPort = '3005';
config.myAccountAddress = '0xb6b724877f84a630a0a9bff1aa4093b1acb37316'; 
config.myChainID = '8545';
config.childChainID = ['7545','9545'];

// web3 provider
config.web3HttpProvider = 'http://localhost:32000'; //rpc port
config.web3WsProvider = 'ws://localhost:33000'; // web socket port

module.exports = config;