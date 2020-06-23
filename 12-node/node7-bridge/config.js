let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'RelayChain-BridgeNode-Three';
config.myIP = 'http://localhost:3007';
config.myAccountAddress = '0xc17be0b0812eb0d05ec44d6e154267fe481fb1d0'; 
config.myChainID = '8545';
config.myPort = 3007;

// web3 provider
config.web3HttpProvider = 'http://localhost:32002'; //rpc port
config.web3WsProvider = 'ws://localhost:33002'; // web socket port

module.exports = config;
