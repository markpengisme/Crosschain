const solc = require("solc"); // solidity
const fs = require("fs"); // file system
const web3js = require("web3"); // web3.js
const config = require("./config.js");

// compile contract to json file
const filename = config.filename;
const contractName = config.contractName;
const source = fs.readFileSync("./contracts/" + filename + ".sol", "UTF-8");
let compiled = solc.compile(source);

// use web3 provider to communicate to node
const web3 = new web3js(config.web3HttpProvider);

// abi, bytecode, contract instance
const abi = JSON.parse(compiled['contracts'][':'+contractName]['interface']);
const bytecode = "0x"+ compiled['contracts'][':'+contractName]['bytecode'];
const contract = new web3.eth.Contract(abi);

web3.eth.net.isListening()
.then(() => {
    console.log("is connected");
})
.catch(e => console.log("Wow. Something went wrong"));

// get first account => use it deploy contract
web3.eth.getAccounts()
.then((accounts) => {
    contract.deploy({
        data: bytecode
        // arguments: [123, 'My String'] // smart contract constructor parameters
    })
    .send({ from: accounts[0] })
    .then((newContractInstance) => {
        console.log(newContractInstance);
        compiled = {};
        compiled.abi = abi;
        compiled.bytecode = bytecode;
        compiled.sendAddress = accounts[0];
        compiled.contractAddress = newContractInstance.options.address;

        // write file to share 
        fs.writeFileSync("./contracts/" + filename + ".json", JSON.stringify(compiled), { flag: 'w' });
        console.log(compiled.sendAddress);
        console.log(compiled.contractAddress);
    })
})