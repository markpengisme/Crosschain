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
const myAccountAddress = config.myAccountAddress;
const myChainID = config.myChainID;
const myPort = config.myPort;
sc = new SecureChannel(myAccountAddress, myIP);

// web3 & contract instance
    // http: send transaction
    // ws: listen event
const http = new web3(config.web3HttpProvider);
const ws = new web3(config.web3WsProvider);
const sendInfoContractHttp = new http.eth.Contract(contracts[0].abi, contracts[0].address);
const sendInfoContractWs = new ws.eth.Contract(contracts[0].abi, contracts[0].address);
const bridgeNodeContractHttp = new http.eth.Contract(contracts[1].abi, contracts[1].address);
const bridgeNodeContractWs = new ws.eth.Contract(contracts[1].abi, contracts[1].address);

async function namingService(name)
{   
    let chainID;
    await bridgeNodeContractHttp.methods.namingService(name)
    .call({from: myAccountAddress})
    .then(function(result) {
        chainID = result;
    });
    return chainID;
}

async function oneBridgeNode(ts, myChainID)
{
    let node;
    await bridgeNodeContractHttp.methods.oneBridgeNode(ts, myChainID)
    .call({from: myAccountAddress})
    .then(function(result) {
        node = result;  
    });
    return node;
}

router = express.Router();
// 跨鏈請求/回覆 by API -> send contract
router.post("/", async function (req, res, next) { 
    try{
        // 解密
        let body = req.body;
        let data = JSON.parse(sc.decrypt(body.myAccountAddress, body.data));
        
        if (data == undefined){throw "Error:data == undefined";}
        // 拿到的節點編號剛好是自己的節點編號,代表該工作
        if (data['workerNode'] === myAccountAddress) {
            /* call合約做紀錄 */
            data.from  = await namingService(data.source);
            data.to = await namingService(data.destination);
            console.log("Call Contract!")
            sendInfoContractHttp.methods.sendInfo(JSON.stringify(data))
            .send({from: myAccountAddress})
            .then(async function (result) {
                console.log("Send to contract to make a record successfully!");
                console.log("TX: ", result.transactionHash);
                console.log(data, "\n");
                res.json({'message': 'success'});

                // 轉發資料給目的地隨機一個的橋接節點，並過濾資料
                let destChainID = data.to;
                delete data.from;
                delete data.to;
                const workerNode = await oneBridgeNode(Date.now().toString(), destChainID);
                data.workerNode = workerNode.accAddress;
                console.log("Child chain workerNode:", data.workerNode);

                // 加密
                let ok = await sc.checkStatus(workerNode.accAddress, workerNode.ip);
                if(!ok){await sc.buildSecureChannel(workerNode.accAddress, workerNode.ip)}
                data = sc.encrypt(workerNode.accAddress, JSON.stringify(data))
                data = {"data":data, "myAccountAddress": myAccountAddress}

                request({
                    method: 'POST',
                    uri: workerNode.ip,
                    json: true,
                    headers: {
                        "content-type": "application/json",
                    },
                    body: data
                },
                // callback回來確認是否成功轉送給橋接節點
                function (error, response, body) {
                    if (error) {
                        console.log('Send to chainID:' + destChainID + ' bridgenode failed:', error, "\n");
                    } else {
                        console.log('Send to chainID:' + destChainID + ' bridgenode successfully! Server responded with:', body, "\n");
                    }  
                });
            })
        } else {
            console.log('IP and Address are incompatible\n');
        }
    } catch (error){
        console.log(error);
        res.json({'message': 'fail'});
    }
});

router.post("/keyExchangeInit", function (req, res, next) {
    try{
        let data = req.body;
        data = sc.keyExchangeInitRes(data.myAddress, data.myIP, data.myPK);
        res.json(data);    
    } catch (error){
        console.log(error);
        res.json({'message': 'fail'});
    }
});

router.post("/keyExchangeFinal", function (req, res, next) {
    try{
        let data = req.body;
        data = sc.keyExchangeFinalRes(data.myAddress, data.myIP);
        res.json(data);
    } catch (error){
        console.log(error);
        res.json({'message': 'fail'});
    }
});

router.post("/keyExchangeChallenge", function (req, res, next) {
    try{
        let data = req.body;
        data = sc.keyExchangeChallengeRes(data.myAddress, data.myIP, data.encrypted);
        res.json(data);
    } catch (error){
        console.log(error);
        res.json({'message': 'fail'});
    }
});

const app = express();
app.use(bodyParser.json());
app.use(router);
app.listen(myPort, function () {
    console.log('Express app started:', myIP);
    console.log('RelayChain node name:', myName, '\n');
});
