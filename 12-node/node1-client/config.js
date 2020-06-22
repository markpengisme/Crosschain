let config = {};

// contract.json
config.filename = "CareCenter"; // compile file-name.soc
config.contractName = "CareCenter"; // if has many contract, need to expand here

// chainID, address, careCenter name, total bridge
config.chainID = '7545';
config.myAccountAddress = '0xdfc31aa6c4cb2aa90c6e59bf7bfc78f34c5c6046'; 
config.myCareCenterName = 'CareCenter One';
config.careCenterChainNodeNum = 3;

// IP, port, req-API
config.myNode = 'http://localhost:3001';
config.myNodeApiPort = 3001;
config.myNodeReqApiPath = '/careCenter/requestInfo';

// web3 provider
config.web3HttpProvider = 'http://localhost:22000'; //rpc port
config.web3WsProvider = 'ws://localhost:23000'; // web socket port

module.exports = config;