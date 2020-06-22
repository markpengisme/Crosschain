let config = {};

// contract.json
config.filename = "Hospital"; // compile file-name.soc
config.contractName = "Hospital"; // if has many contract, need to expand here

// chainID, address, careCenter name, total bridge
config.chainID = '9545';
config.myAccountAddress = '0xa0eda1e2195ed7b8d9445365e6d5cf03bd005db2'; 
config.myHospitalName = 'Hospital One';
config.hospitalChainNodeNum = 3;

// IP, port, res-API
config.myNode = 'http://localhost:3012';
config.myNodeApiPort = 3012;
config.myNodeResApiPath = '/hospital/responseInfo';

// web3 provider
config.web3HttpProvider = 'http://localhost:42003'; //rpc port
config.web3WsProvider = 'ws://localhost:43003'; // web socket port

module.exports = config;