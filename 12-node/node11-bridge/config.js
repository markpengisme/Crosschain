let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'Hospital-BridgeNode-Three';
config.myIP = '127.0.0.1';
config.myApiPort = '3011';
config.myAccountAddress = '0x21d4935c9bc94b4cf5b87555e0eaf767c66f77fd'; 
config.myChainID = '9545';
config.relayChainID = '8545';

// web3 provider
config.web3HttpProvider = 'http://localhost:42002'; //rpc port
config.web3WsProvider = 'ws://localhost:43002'; // web socket port

module.exports = config;