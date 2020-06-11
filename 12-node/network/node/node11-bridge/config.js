let config = {};

// contract.json
config.filename = "Hospital"; // compile file-name.soc
config.contractName = "Hospital"; // if has many contract, need to expand here

// chainID, address, careCenter name, nodeNumber
config.chainID = '9545';
config.myAccountAddress = '0xb9bbbe1a010a4bb4b288b428e40ce72cc233d750'; 
config.myHospitalName = 'BridgeNode Three';
config.myNodeNumber = 3;

// IP, port, web3 provider, req-API
config.myNode = 'http://localhost:3011';
config.myNodeApiPort = 3011;
config.myNodeReqApiPath = '/hospital/requestInfo';

// web3 provider
config.web3HttpProvider = 'http://localhost:42002'; //rpc port
config.web3WsProvider = 'ws://localhost:43002'; // web socket port

// relaychain res-api
config.relayChainNode = [
    'http://localhost:3005/relayChain/responseInfo',
    'http://localhost:3006/relayChain/responseInfo',
    'http://localhost:3007/relayChain/responseInfo',
    'http://localhost:3008/relayChain/responseInfo'
];

module.exports = config;
