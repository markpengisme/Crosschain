let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'Hospital-BridgeNode-Three';
config.myIP = 'http://localhost:3011';
config.myAccountAddress = '0xb9bbbe1a010a4bb4b288b428e40ce72cc233d750'; 
config.myChainID = '9545';
config.myPort = 3011;
config.relayChainID = '8545';

// web3 provider
config.web3HttpProvider = 'http://localhost:42002'; //rpc port
config.web3WsProvider = 'ws://localhost:43002'; // web socket port

module.exports = config;