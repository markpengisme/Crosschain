let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'CareCenter-One';
config.myIP = 'http://localhost:3001';
config.myAccountAddress = '0x57745fca90934062d05e76e99655f424be713c6d'; 
config.myChainID = '7545';
config.myPort = 3001;
config.relayChainID = '8545';

// web3 provider
config.web3HttpProvider = 'http://localhost:22000'; //rpc port
config.web3WsProvider = 'ws://localhost:23000'; // web socket port

module.exports = config;
