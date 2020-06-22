let config = {};

// contract.json
config.filename = "CareCenter"; // compile file-name.soc
config.contractName = "CareCenter"; // if has many contract, need to expand here

// chainID, address, careCenter name, nodeNumber
config.chainID = '7545';
config.myAccountAddress = '0x33c080ec045337ce4c2e82d2be7737c39147c700';
config.myCareCenterName = 'BridgeNode Three';
config.myNodeNumber = 3;

// IP, port, web3 provider, res-API
config.myNode = 'http://localhost:3004';
config.myNodeApiPort = 3004;
config.myNodeResApiPath = '/careCenter/responseInfo';

// web3 provider
config.web3HttpProvider = 'http://localhost:22003'; //rpc port
config.web3WsProvider = 'ws://localhost:23003'; // web socket port

// relaychain req-api
config.relayChainNode = [
    'http://localhost:3005/relayChain/requestInfo',
    'http://localhost:3006/relayChain/requestInfo',
    'http://localhost:3007/relayChain/requestInfo',
    'http://localhost:3008/relayChain/requestInfo'
];

module.exports = config;
