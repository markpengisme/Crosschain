let config = {};

// contract.json
config.filename = "RelayChain"; // compile file-name.soc
config.contractName = "RelayChain"; // if has many contract, need to expand here

// chainID, address, careCenter name, nodeNumber
config.chainID = '8545';
config.myAccountAddress = '0xc17be0b0812eb0d05ec44d6e154267fe481fb1d0'; 
config.myRelayChainName = 'BridgeNode Three';
config.myNodeNumber = 3;

// IP, port, web3 provider, res-API, req-API
config.myNode = 'http://localhost:3007';
config.myNodeApiPort = 3007;
config.myNodeReqApiPath = '/relayChain/requestInfo'
config.myNodeResApiPath = '/relayChain/responseInfo';

// web3 provider
config.web3HttpProvider = 'http://localhost:32002'; //rpc port
config.web3WsProvider = 'ws://localhost:33002'; // web socket port

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
