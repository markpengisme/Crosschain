let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'RelayChain-BridgeNode-Four';
config.myIP = 'http://localhost:3008';
config.myAccountAddress = '0x18e6b9f7d93ebd4d46ad993638a2a51c3d8d168b'; 
config.myChainID = '8545';
config.myPort = 3008;

// web3 provider
config.web3HttpProvider = 'http://localhost:32003'; //rpc port
config.web3WsProvider = 'ws://localhost:33003'; // web socket port

module.exports = config;