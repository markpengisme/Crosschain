let config = {};

// contract.json
config.filename = "CareCenter"; // compile file-name.soc
config.contractName = "CareCenter"; // if has many contract, need to expand here

// chainID, address, careCenter name, nodeNumber
config.chainID = '7545';
config.myAccountAddress = '0x149f65589a0a295896f997c1e7764b6cb2d4f1b4'; 
config.myCareCenterName = 'BridgeNode One';
config.myNodeNumber = 1;

// IP, port, web3 provider, res-API
config.myNode = 'http://localhost:3002';
config.myNodeApiPort = 3002;
config.myNodeResApiPath = '/careCenter/responseInfo';

// web3 provider
config.web3HttpProvider = 'http://localhost:22001'; //rpc port
config.web3WsProvider = 'ws://localhost:23001'; // web socket port

// relaychain req-api
config.relayChainNode = [
    'http://localhost:3005/relayChain/requestInfo',
    'http://localhost:3006/relayChain/requestInfo',
    'http://localhost:3007/relayChain/requestInfo',
    'http://localhost:3008/relayChain/requestInfo'
];

module.exports = config;
