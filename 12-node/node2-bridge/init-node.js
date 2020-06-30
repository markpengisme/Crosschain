const fs = require('fs');
const web3 = require('web3');
const config = require("./config.js");
const compiled = JSON.parse(fs.readFileSync('./contracts/Bridgenode.json', 'UTF-8'));
const web3HttpProvider = config.web3HttpProvider;
const http = new web3(web3HttpProvider);
console.log("Initiate Contract:",compiled.contractAddress);
const bridgeNodeContractHttp = new http.eth.Contract(compiled.abi,compiled.contractAddress);
const myAccountAddress = config.myAccountAddress;
(async () => {
    try{
        await bridgeNodeContractHttp.methods.registerBridgeNode("CareCenter-BridgeNode-One", "127.0.0.1", "3002", "0xa93278ed1977727474ccd5b0d4ac313037d7f8a6", "7545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("CareCenter-BridgeNode-Two", "127.0.0.1", "3003", "0x281c5cb496a751305b0dd7907320ee55836095c6", "7545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("CareCenter-BridgeNode-Three", "127.0.0.1", "3004", "0x406986b7f121e58453cff9950a27e75ba9d8ea82", "7545").send({from: myAccountAddress});
        
        await bridgeNodeContractHttp.methods.registerBridgeNode("RelayChain-BridgeNode-One", "127.0.0.1", "3005", "0xb6b724877f84a630a0a9bff1aa4093b1acb37316", "8545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("RelayChain-BridgeNode-Two", "127.0.0.1", "3006", "0x1f33e7167f2938d80408f4c3d3507c927877b350", "8545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("RelayChain-BridgeNode-Three", "127.0.0.1", "3007", "0x89326c9b03e4ebee6fadcad18c8e98a4e7033f8c", "8545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("RelayChain-BridgeNode-Four", "127.0.0.1", "3008", "0x18e6b9f7d93ebd4d46ad993638a2a51c3d8d168b", "8545").send({from: myAccountAddress});
        console.log("Initiate success");
    } catch (error){
        console.log(error);
    }
    
})();
