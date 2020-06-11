const fs = require('fs');
const web3 = require('web3');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const config = require("./config.js");

// read contract build & 合約ABI & 合約Address
const compiled = JSON.parse(fs.readFileSync('./contracts/' + config.contractName + '.json', 'UTF-8'));
const careCenterContractABI = compiled.abi;
const careCenterContractAddress = compiled.contractAddress;

// chainID, address, careCenter Name, nodeNumber
const chainID = config.chainID;
const myAccountAddress = config.myAccountAddress;
const myCareCenterName = config.myCareCenterName;
const myNodeNumber = config.myNodeNumber;

// IP, port, res-API
const myNode = config.myNode;
const myNodeApiPort = config.myNodeApiPort;
const myNodeResApiPath = config.myNodeResApiPath;

// web3 & contract instance
    // http: send transaction
    // ws: listen event
const careCenterWeb3Http = new web3(config.web3HttpProvider);
const careCenterContractHttp = new careCenterWeb3Http.eth.Contract(careCenterContractABI, careCenterContractAddress);
const careCenterWeb3Ws = new web3(config.web3WsProvider);
const careCenterContractWs = new careCenterWeb3Ws.eth.Contract(careCenterContractABI, careCenterContractAddress);

// relaychain req-api
const relayChainNode = config.relayChainNode;

// 開始監聽合約事件
console.log('start to listen!');

// 接收跨鏈請求 by listen contract event -> call API
careCenterContractWs.events.requestEvent({}, function (error, result) {
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
            let uri = relayChainNode[Math.floor(Math.random()*relayChainNode.length)];
            // 將資料轉發給relayChain的橋接節點
            request({
                    method: 'POST',
                    uri: uri,
                    json: true,
                    headers: {
                        "content-type": "application/json",
                    },
                    body: {info}
                },
                // callback回來確認是否成功轉送給relayChain的橋接節點
                function (error, response, body) {
                    if (error) {
                        console.log('Send to relaychain bridgenode failed:', error);
                    } else {
                        console.log('Send to relaychain bridgenode successfully! Server responded with:', body);
                    }
                })
        } else {
            console.log('不是我該做的....')
        }
    } else {
        console.log('listen error:', error)
    }
});

// 回覆跨鏈請求 by API -> send contract
router = express.Router();
router.post(myNodeResApiPath, function (req, res, next) {
    try{
        let info = req.body.info;
        if (info == undefined){throw "Error:info == undefined";}
        info = JSON.stringify(info); // 傳入區塊鏈前 stringify

        /* 跨鏈呼叫合約 */
        careCenterContractHttp.methods.responseInfo(info)
        .send({from: myAccountAddress})
        .then(function (result) {
            console.log('**********  Response  **********');
            console.log(JSON.parse(info));
            console.log("Send to contract successfully!");
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
    console.log('CareCenter Name:', myCareCenterName);
    console.log('Response Health Data API:', myNodeResApiPath);
});

