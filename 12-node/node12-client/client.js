const fs = require('fs');
const web3 = require('web3');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const config = require("./config.js");

// read contract build & 合約ABI & 合約Address
let contracts = [];
config.contractNames.forEach( contractName => {
    const compiled = JSON.parse(fs.readFileSync('./contracts/' + contractName + '.json', 'UTF-8'));
    contracts.push(
        {
            "name": contractName,
            "abi": compiled.abi,
            "address": compiled.contractAddress
        }
    )
});

// Name, IP, Address, chainID, port
const myName = config.myName;
const myIP = config.myIP;
const myApiPort = config.myApiPort;
const myAccountAddress = config.myAccountAddress;
const myChainID = config.myChainID;
let nodeList = [];

// web3 & contract instance
    // http: send transaction
    // ws: listen event
const http = new web3(config.web3HttpProvider);
const ws = new web3(config.web3WsProvider);
const sendInfoContractHttp = new http.eth.Contract(contracts[0].abi, contracts[0].address);
const sendInfoContractWs = new ws.eth.Contract(contracts[0].abi, contracts[0].address);
const bridgeNodeContractHttp = new http.eth.Contract(contracts[1].abi, contracts[1].address);
const bridgeNodeContractWs = new ws.eth.Contract(contracts[1].abi, contracts[1].address);

async function randomBridgeNode(ts, chainID)
{
    let node;
    await bridgeNodeContractHttp.methods.randomBridgeNode(ts, chainID)
    .call({from: myAccountAddress})
    .then(function(result) {
        node = result;  
    });
    return node;
}
async function getNodeList(chainID)
{
    let count = 0;
    let list = [];
    await bridgeNodeContractHttp.methods.getChainIDToBridgeNodeCount(chainID)
    .call({from: myAccountAddress})
    .then(function(result) {
        count = result;  
    });

    for(let i = 0; i < count; i++) { 
        await bridgeNodeContractHttp.methods.oneBridgeNode(i, chainID)
        .call({from: myAccountAddress})
        .then(function(result) {
            list.push(result);
        });
    }
    return list;
}
async function checkIP(ip, nodeList)
{
    return new Promise(function (resolve, reject) {
        for(let i = 0; i < nodeList.length; i++) { 
            if (nodeList[i].ip == ip){
                console.log("\nIP is allowed")
                return resolve(undefined);
            }
        }
        return reject("\nError: IP is not allowed");
    });
}

ws.eth.net.isListening()
.then(async () => {
    console.log("Update ip list");
    nodeList = await getNodeList(myChainID);
});

// 開始監聽合約事件
console.log('start to listen!');
// 跨鏈請求 by listen contract event -> call gateway server API
sendInfoContractWs.events.infoEvent({}, function (error, result) {
    if (error === null) {
        // 監聽器拿到資料
        let data = result.returnValues.data;
        data = JSON.parse(data);
        console.log('Listen to event successfully!');

        // 拿到的醫院名字剛好是自己的醫院名字,代表該工作
        if (data['destination'] === myName) {
            console.log(myName, ",Finally get it:", data);
        } else {
            console.log('Not my job....\n');
        }
    } else {
        console.log('listen error:', error)
    }
});

router = express.Router();
// 跨鏈回覆 by API -> send response contract
router.post("/", async function (req, res, next) {
    try{
        await checkIP(req.connection.remoteAddress, nodeList);
        let data = req.body;
        if (data == undefined){throw "Error:data == undefined";}
        const workerNode = await randomBridgeNode(Date.now().toString(), myChainID);
        data.workerNode = workerNode.accAddress;
        
        console.log("Call Contract!")
        sendInfoContractHttp.methods.sendInfo(JSON.stringify(data))
        .send({from: myAccountAddress})
        .then(function(result) {
            console.log("Send to contract successfully!");
            console.log("TX:", result.transactionHash);
            console.log(data);
            res.json({'message': 'success'});
        })
    } catch (error){
        console.log(error);
        res.json({'message': 'fail'});
    }
});

const app = express();
app.use(bodyParser.json());
app.use(router);
app.listen(myApiPort, myIP, function () {
    console.log('Express app started:', myIP);
    console.log('Hospital name:', myName, '\n');
});