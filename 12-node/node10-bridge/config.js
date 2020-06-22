let config = {};

// contract.json
config.filename = "Hospital"; // compile file-name.soc
config.contractName = "Hospital"; // if has many contract, need to expand here

// chainID, address, careCenter name, nodeNumber
config.chainID = '9545';
config.myAccountAddress = '0x8bf842ad24254af5d39a913cc87238f4b3510dda'; 
config.myHospitalName = 'BridgeNode Two';
config.myNodeNumber = 2;

// IP, port, web3 provider, req-API
config.myNode = 'http://localhost:3010';
config.myNodeApiPort = 3010;
config.myNodeReqApiPath = '/hospital/requestInfo';

// web3 provider
config.web3HttpProvider = 'http://localhost:42001'; //rpc port
config.web3WsProvider = 'ws://localhost:43001'; // web socket port

// relaychain res-api
config.relayChainNode = [
    'http://localhost:3005/relayChain/responseInfo',
    'http://localhost:3006/relayChain/responseInfo',
    'http://localhost:3007/relayChain/responseInfo',
    'http://localhost:3008/relayChain/responseInfo'
];

module.exports = config;
