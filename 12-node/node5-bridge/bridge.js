const fs = require('fs');
const web3 = require('web3');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const config = require("./config.js");

// contract build -> 合約ABI & 合約Address
const compiled = JSON.parse(fs.readFileSync("./contracts/" + config.contractName + ".json", "UTF-8"));
const relayChainContractABI = compiled.abi;
const relayChainContractAddress = compiled.contractAddress;

// chainID, address, careCenter name, nodeNumber
const chainID = config.chainID;
const myAccountAddress = config.myAccountAddress;
const myRelayChainName = config.myRelayChainName;
const myNodeNumber = config.myNodeNumber;

// IP, port, res-API, req-API
const myNode = config.myNode;
const myNodeApiPort = config.myNodeApiPort;
const myNodeReqApiPath = config.myNodeReqApiPath;
const myNodeResApiPath = config.myNodeResApiPath;

// web3 & contract instance
// http: send transaction
// ws: listen event
const relayChainWeb3Http = new web3(config.web3HttpProvider);
const relayChainContractHttp = new relayChainWeb3Http.eth.Contract(relayChainContractABI, relayChainContractAddress);
const relayChainWeb3Ws = new web3(config.web3WsProvider);
const relayChainContractWs = new relayChainWeb3Ws.eth.Contract(relayChainContractABI, relayChainContractAddress);

// carecenter res-api & hospital req-api
const careCenterChainNode = config.careCenterChainNode;
const hospitalChainNode = config.hospitalChainNode;

// 開始監聽合約事件
console.log('start to listen!');

// 接收跨鏈請求 by listen contract event -> call hospitalChain API
relayChainContractWs.events.requestEvent({}, function (error, result) {
    if (error === null) {
        // 監聽器拿到資料
        console.log('**********  Request  **********');
        console.log('Listen to event successfully!');
        let data = result.returnValues.info;
        data = JSON.parse(data);
        let info = data.info;
        let node = data.node;
        
        // 拿到的節點編號剛好是自己的節點編號,代表該工作
        if (node['workerNode'] === myNodeNumber) {
            console.log('data:', data);
            let uri = hospitalChainNode[Math.floor(Math.random()*hospitalChainNode.length)];
            
             // 轉發資料給隨機一個 hospitalChain 的橋接節點
            request({
                    method: 'POST',
                    uri: uri,
                    json: true,
                    headers: {
                        "content-type": "application/json",
                    },
                    body: {info}
                },
                // callback回來確認是否成功轉送給 hospitalChain 的橋接節點
                function (error, response, body) {
                    if (error) {
                        console.log('Send to hospitalChain bridgenode failed:', error);
                    } else {
                        console.log('Send to hospitalChain bridgenode successfully! Server responded with:', body);
                    }   
                })
        } else {
            console.log('不是我該做的....')
        }
    } else {
        console.log('Listen error:', error)
    }
});

// 回覆跨鏈請求 by listen contract event -> call careCenter API
relayChainContractWs.events.responseEvent({}, function (error, result) {
    if (error === null) {
        // 監聽器拿到資料
        console.log('**********  Response  **********');
        console.log('Listen to event successfully!');
        let data = result.returnValues.info;
        data = JSON.parse(data);
        let info = data.info;
        let node = data.node;
        
        // 拿到的節點編號剛好是自己的節點編號,代表該工作
        if (node['workerNode'] === myNodeNumber) {
            console.log('data:', data);
            let uri = careCenterChainNode[Math.floor(Math.random()*careCenterChainNode.length)];
            
             // 轉發資料給隨機一個 careCenterChain 的橋接節點
            request({
                    method: 'POST',
                    uri: uri,
                    json: true,
                    headers: {
                        "content-type": "application/json",
                    },
                    body: {info}
                },
                // callback回來確認是否成功轉送給 careCenterChain 的橋接節點
                function (error, response, body) {
                    if (error) {
                        console.log('Send to careCenterChain bridgenode failed:', error);
                    } else {
                        console.log('Send to careCenterChain bridgenode successfully! Server responded with:', body);
                    }   
                })
        } else {
            console.log('不是我該做的....')
        }
    } else {
        console.log('Listen error:', error)
    }
});

router = express.Router();

// 接收跨鏈請求 by API -> send contract
router.post(myNodeReqApiPath, function (req, res, next) { 
    try{
        const info = req.body.info;
        if (info == undefined){throw "Error:info == undefined";}
        const node = {'workerNode': myNodeNumber};
        let data = {info: info, node: node};
        data = JSON.stringify(data); // 傳入區塊鏈前 stringify

        /* 自己做call合約給自己聽 */
        console.log("Call Contract!")
        relayChainContractHttp.methods.requestInfo(data)
        .send({from: myAccountAddress})
        .then(function (result) {
            res.json({'message': 'success'});
         })
    } catch (error){
        console.log(error);
        res.json({'message': 'fail'});
    }
});

// 回覆跨鏈請求 by API -> send contract
router.post(myNodeResApiPath, function (req, res, next) { 
    try{
        const info = req.body.info;
        if (info == undefined){throw "Error:info == undefined";}
        const node = {'workerNode': myNodeNumber};
        let data = {info: info, node: node};
        data = JSON.stringify(data); // 傳入區塊鏈前 stringify

        /* 自己做call合約給自己聽 */
        console.log("Call Contract!")
        relayChainContractHttp.methods.responseInfo(data)
        .send({from: myAccountAddress})
        .then(function (result) {
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
app.listen(myNodeApiPort, function () {
    console.log('Express app started:', myNode);
    console.log('RelayChain node Name:', myRelayChainName);
    console.log('Request Health Data API:', myNodeReqApiPath);
    console.log('Response Health Data API:', myNodeResApiPath);
});
