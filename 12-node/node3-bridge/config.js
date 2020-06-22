let config = {};

// contract.json
config.filename = "CareCenter"; // compile file-name.soc
config.contractName = "CareCenter"; // if has many contract, need to expand here

// chainID, address, careCenter name, nodeNumber
config.chainID = '7545';
config.myAccountAddress = '0xaf818e490f563f652f1a5a3e3a84bea9b68fc8e2'; 
config.myCareCenterName = 'BridgeNode Two';
config.myNodeNumber = 2;

// IP, port, web3 provider, res-API
config.myNode = 'http://localhost:3003';
config.myNodeApiPort = 3003;
config.myNodeResApiPath = '/careCenter/responseInfo';

// web3 provider
config.web3HttpProvider = 'http://localhost:22002'; //rpc port
config.web3WsProvider = 'ws://localhost:23002'; // web socket port

// relaychain req-api
config.relayChainNode = [
    'http://localhost:3005/relayChain/requestInfo',
    'http://localhost:3006/relayChain/requestInfo',
    'http://localhost:3007/relayChain/requestInfo',
    'http://localhost:3008/relayChain/requestInfo'
];

module.exports = config;
