const fs = require('fs');
const web3 = require('web3');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const config = require("./config.js");
const SecureChannel = require("./ecdh.js");

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

// Name, IP, Address, ChainID, port
const myName = config.myName;
const myIP = config.myIP;
const myApiPort = config.myApiPort;
const myAccountAddress = config.myAccountAddress;
const myChainID = config.myChainID;
const relayChainID = config.relayChainID;
let nodeList = [];
sc = new SecureChannel(myAccountAddress, myIP, myApiPort);

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
    nodeList = await getNodeList(relayChainID);
});

// 開始監聽合約事件
console.log('start to listen!');
// 接收跨鏈請求 by listen contract event -> call API
sendInfoContractWs.events.infoEvent({}, async function (error, result) {
    try {
        if (error === null) {
            // 監聽器拿到資料
            console.log('Listen to event successfully!');
            let data = result.returnValues.data;
            data = JSON.parse(data);
            
            // 拿到的節點編號剛好是自己的節點編號,代表該工作
            if (data['workerNode'] === myAccountAddress) {
                console.log("Get a job");
                const workerNode = await randomBridgeNode(Date.now().toString(), relayChainID);
                data.workerNode = workerNode.accAddress;
                console.log("Relay chain workerNode:", data.workerNode);

                // 加密
                let ok = await sc.checkStatus(workerNode.accAddress, workerNode.ip, workerNode.apiPort);
                if(!ok){throw "secure channel can't build"};
                data = sc.encrypt(workerNode.accAddress, JSON.stringify(data))
                data = {"data":data, "myAccountAddress": myAccountAddress}

                // 將資料轉發給relayChain的橋接節點
                request({
                        method: 'POST',
                        uri: "http://" + workerNode.ip + ":" + workerNode.apiPort,
                        json: true,
                        headers: {
                            "content-type": "application/json",
                        },
                        body: data
                    },
                    // callback回來確認是否成功轉送給relayChain的橋接節點
                    function (error, response, body) {
                        if (error) {
                            console.log('Send to relaychain bridgenode failed:', error, "\n");
                        } else {
                            console.log('Send to relaychain bridgenode successfully! Server responded with:', body, "\n");
                        }
                    })
            } else {
                console.log('Not my job....')
            }
        } else {
            console.log('listen error:', error)
        }
    } catch (error) {
        console.log('Error:', error);
    }
});

router = express.Router();
// 跨鏈回覆 by API -> send contract
router.post("/", async function (req, res, next) {
    try{
        await checkIP(req.connection.remoteAddress, nodeList);
        // 解密
        let body = req.body;
        let data = JSON.parse(sc.decrypt(body.myAccountAddress, body.data));

        if (data == undefined){throw "Error:data == undefined";}
        delete data.workerNode;

        console.log("Call Contract!");
        sendInfoContractHttp.methods.sendInfo(JSON.stringify(data))
        .send({from: myAccountAddress})
        .then(function (result) {
            console.log("Send to contract successfully!");
            console.log("TX: ", result.transactionHash);
            console.log(data, "\n");
            res.json({'message': 'success'});
        });
    } catch (error){
        console.log(error);
        res.json({'message': 'fail'});
    }
});

router.post("/keyExchangeInit", async function (req, res, next) {
    try{
        await checkIP(req.connection.remoteAddress, nodeList);
        let data = req.body;
        data = sc.keyExchangeInitRes(data);
        res.json(data);    
    } catch (error){
        console.log(error);
        res.json({'message': 'fail'});
    }
});

router.post("/keyExchangeFinal", async function (req, res, next) {
    try{
        await checkIP(req.connection.remoteAddress, nodeList);
        let data = req.body;
        data = sc.keyExchangeFinalRes(data);
        res.json(data);
    } catch (error){
        console.log(error);
        res.json({'message': 'fail'});
    }
});

router.post("/keyExchangeChallenge", async function (req, res, next) {
    try{
        await checkIP(req.connection.remoteAddress, nodeList);
        let data = req.body;
        data = sc.keyExchangeChallengeRes(data);
        res.json(data);
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
    console.log('CareCenter name:', myName, '\n');
});

