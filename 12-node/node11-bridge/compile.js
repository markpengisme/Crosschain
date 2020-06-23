const solc = require("solc"); // solidity
const fs = require("fs"); // file system
const web3js = require("web3"); // web3.js
const config = require("./config.js");

// compile contract to json file
const contractNames = config.contractNames;
contractNames.forEach( contractName => {
    const source = fs.readFileSync("./contracts/" + contractName + ".sol", "UTF-8");
    let compiled = solc.compile(source);

    // use web3 provider to communicate to node
    const web3 = new web3js(config.web3HttpProvider);

    // abi, bytecode, contract instance
    const abi = JSON.parse(compiled['contracts'][':'+contractName]['interface']);
    const bytecode = "0x"+ compiled['contracts'][':'+contractName]['bytecode'];
    const contract = new web3.eth.Contract(abi);

    web3.eth.net.isListening()
    .catch(e => console.log("Not connect"));

    // get first account => use it deploy contract
    web3.eth.getAccounts()
    .then((accounts) => {
        contract.deploy({
            data: bytecode
            // arguments: [123, 'My String'] // smart contract constructor parameters
        })
        .send({ from: accounts[0] })
        .then((newContractInstance) => {
            // console.log(newContractInstance);
            compiled = {};
            compiled.abi = abi;
            compiled.bytecode = bytecode;
            compiled.sendAddress = accounts[0];
            compiled.contractAddress = newContractInstance.options.address;

            // write file to share 
            fs.writeFileSync("./contracts/" + contractName + ".json", JSON.stringify(compiled), { flag: 'w' });
            console.log("Name:", contractName);
            console.log("Send Address:", compiled.sendAddress);
            console.log("Contract Address:", compiled.contractAddress);
        })
    })
});