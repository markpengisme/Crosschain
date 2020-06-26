let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'RelayChain-BridgeNode-Three';
config.myIP = 'http://localhost:3007';
config.myAccountAddress = '0x89326c9b03e4ebee6fadcad18c8e98a4e7033f8c'; 
config.myChainID = '8545';
config.myPort = 3007;

// web3 provider
config.web3HttpProvider = 'http://localhost:32002'; //rpc port
config.web3WsProvider = 'ws://localhost:33002'; // web socket port

module.exports = config;
