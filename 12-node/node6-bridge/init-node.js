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
        await bridgeNodeContractHttp.methods.registerOtherOrg("CareCenter-One", "7545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("CareCenter-BridgeNode-One", "http://localhost:3002", "0x149f65589a0a295896f997c1e7764b6cb2d4f1b4", "7545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("CareCenter-BridgeNode-Two", "http://localhost:3003", "0xaf818e490f563f652f1a5a3e3a84bea9b68fc8e2", "7545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("CareCenter-BridgeNode-Three", "http://localhost:3004", "0x33c080ec045337ce4c2e82d2be7737c39147c700", "7545").send({from: myAccountAddress});

        await bridgeNodeContractHttp.methods.registerBridgeNode("RelayChain-BridgeNode-One", "http://localhost:3005", "0x6ca59ef72aea163bcd87239edb673fb0293d4e40", "8545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("RelayChain-BridgeNode-Two", "http://localhost:3006", "0x0e66d201fbc294d0163b26153e32a050bc4be92e", "8545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("RelayChain-BridgeNode-Three", "http://localhost:3007", "0xc17be0b0812eb0d05ec44d6e154267fe481fb1d0", "8545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("RelayChain-BridgeNode-Four", "http://localhost:3008", "0x6287b6af7454f63dabdacf68bd76d2936e242f51", "8545").send({from: myAccountAddress});

        await bridgeNodeContractHttp.methods.registerBridgeNode("Hospital-BridgeNode-One", "http://localhost:3009", "0xaa2abfeb6d776492cf49746de955127e71025909", "9545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("Hospital-BridgeNode-Two", "http://localhost:3010", "0x8bf842ad24254af5d39a913cc87238f4b3510dda", "9545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("Hospital-BridgeNode-Three", "http://localhost:3011", "0xb9bbbe1a010a4bb4b288b428e40ce72cc233d750", "9545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerOtherOrg("Hospital-One", "9545").send({from: myAccountAddress});
        console.log("Initiate success");
    } catch (error){
        console.log(error);
    }
    
})();
