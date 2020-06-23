let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'Hospital-One';
config.myIP = 'http://localhost:3012';
config.myAccountAddress = '0xa0eda1e2195ed7b8d9445365e6d5cf03bd005db2'; 
config.myChainID = '9545';
config.myPort = 3012;
config.relayChainID = '8545';

// web3 provider
config.web3HttpProvider = 'http://localhost:42003'; //rpc port
config.web3WsProvider = 'ws://localhost:43003'; // web socket port

module.exports = config;