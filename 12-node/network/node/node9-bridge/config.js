let config = {};

// contract.json
config.filename = "Hospital"; // compile file-name.soc
config.contractName = "Hospital"; // if has many contract, need to expand here

// chainID, address, careCenter name, nodeNumber
config.chainID = '9545';
config.myAccountAddress = '0xaa2abfeb6d776492cf49746de955127e71025909'; 
config.myHospitalName = 'BridgeNode One';
config.myNodeNumber = 1;

// IP, port, web3 provider, req-API
config.myNode = 'http://localhost:3009';
config.myNodeApiPort = 3009;
config.myNodeReqApiPath = '/hospital/requestInfo';

// web3 provider
config.web3HttpProvider = 'http://localhost:42000'; //rpc port
config.web3WsProvider = 'ws://localhost:43000'; // web socket port

// relaychain res-api
config.relayChainNode = [
    'http://localhost:3005/relayChain/responseInfo',
    'http://localhost:3006/relayChain/responseInfo',
    'http://localhost:3007/relayChain/responseInfo',
    'http://localhost:3008/relayChain/responseInfo'
];

module.exports = config;
