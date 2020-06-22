let config = {};

// contract.json
config.filename = "RelayChain"; // compile file-name.soc
config.contractName = "RelayChain"; // if has many contract, need to expand here

// chainID, address, careCenter name, nodeNumber
config.chainID = '8545';
config.myAccountAddress = '0x0e66d201fbc294d0163b26153e32a050bc4be92e'; 
config.myRelayChainName = 'BridgeNode Two';
config.myNodeNumber = 2;

// IP, port, web3 provider, res-API, req-API
config.myNode = 'http://localhost:3006';
config.myNodeApiPort = 3006;
config.myNodeReqApiPath = '/relayChain/requestInfo'
config.myNodeResApiPath = '/relayChain/responseInfo';

// web3 provider
config.web3HttpProvider = 'http://localhost:32001'; //rpc port
config.web3WsProvider = 'ws://localhost:33001'; // web socket port

// carecenter res-api
config.careCenterChainNode = [
    'http://localhost:3002/careCenter/responseInfo',
    'http://localhost:3003/careCenter/responseInfo',
    'http://localhost:3004/careCenter/responseInfo'
];

// hospital req-api
config.hospitalChainNode = [
    'http://localhost:3009/hospital/requestInfo',
    'http://localhost:3010/hospital/requestInfo',
    'http://localhost:3011/hospital/requestInfo'
];

module.exports = config;
