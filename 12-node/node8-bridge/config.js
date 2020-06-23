let config = {};

// contract.json
config.contractNames = ["SendInfo","BridgeNode"]; // if has many contract, need to expand here

// Name, IP, Address, ChainID, port
config.myName = 'RelayChain-BridgeNode-Four';
config.myIP = 'http://localhost:3008';
config.myAccountAddress = '0x6287b6af7454f63dabdacf68bd76d2936e242f51'; 
config.myChainID = '8545';
config.myPort = 3008;

// web3 provider
config.web3HttpProvider = 'http://localhost:32003'; //rpc port
config.web3WsProvider = 'ws://localhost:33003'; // web socket port

module.exports = config;