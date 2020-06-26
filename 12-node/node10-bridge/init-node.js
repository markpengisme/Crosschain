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
        await bridgeNodeContractHttp.methods.registerBridgeNode("RelayChain-BridgeNode-One", "http://localhost:3005", "0xb6b724877f84a630a0a9bff1aa4093b1acb37316", "8545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("RelayChain-BridgeNode-Two", "http://localhost:3006", "0x1f33e7167f2938d80408f4c3d3507c927877b350", "8545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("RelayChain-BridgeNode-Three", "http://localhost:3007", "0x89326c9b03e4ebee6fadcad18c8e98a4e7033f8c", "8545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("RelayChain-BridgeNode-Four", "http://localhost:3008", "0x18e6b9f7d93ebd4d46ad993638a2a51c3d8d168b", "8545").send({from: myAccountAddress});

        await bridgeNodeContractHttp.methods.registerBridgeNode("Hospital-BridgeNode-One", "http://localhost:3009", "0x95c0abb132fef71d6351cfde3daecc06b5f14d08", "9545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("Hospital-BridgeNode-Two", "http://localhost:3010", "0xfe98d6e761e11e9752b08c655910256899bf366a", "9545").send({from: myAccountAddress});
        await bridgeNodeContractHttp.methods.registerBridgeNode("Hospital-BridgeNode-Three", "http://localhost:3011", "0x21d4935c9bc94b4cf5b87555e0eaf767c66f77fd", "9545").send({from: myAccountAddress});
        console.log("Initiate success");
    } catch (error){
        console.log(error);
    }
    
})();
