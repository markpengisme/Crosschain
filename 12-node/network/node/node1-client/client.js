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

// chainID, address, careCenter Name, total bridge
const chainID = config.chainID;
const myAccountAddress = config.myAccountAddress;
const myCareCenterName = config.myCareCenterName;
const careCenterChainNodeNum = config.careCenterChainNodeNum;

// IP, port, req-API
const myNode = config.myNode;
const myNodeApiPort = config.myNodeApiPort;
const myNodeReqApiPath = config.myNodeReqApiPath;

// web3 & contract instance
    // http: send transaction
    // ws: listen event
const careCenterWeb3Http = new web3(config.web3HttpProvider);
const careCenterContractHttp = new careCenterWeb3Http.eth.Contract(careCenterContractABI, careCenterContractAddress);
const careCenterWeb3Ws = new web3(config.web3WsProvider);
const careCenterContractWs = new careCenterWeb3Ws.eth.Contract(careCenterContractABI, careCenterContractAddress);

// 開始監聽合約事件
console.log('start to listen!');

// 回覆跨鏈請求 by listen contract event -> call API
careCenterContractWs.events.responseEvent({}, function (error, result) {
    if (error === null) {
        // 監聽器拿到資料
        let info = result.returnValues.info;
        info = JSON.parse(info);
        console.log('**********  Response  **********');
        console.log('Listen to event successfully!');
        
        // 拿到的照護中心名字剛好是自己的照護中心名字,代表該工作
        if (info['destination'] === myCareCenterName) {
            console.log(myCareCenterName, "終於拿到資料...:", info);
            // TODO: 轉發資料給自己的的Resource Server
           
        } else {
            console.log('不是我該做的....')
        }
    } else {
        console.log('listen error:', error)
    }
});

// 接受跨鏈請求 by API -> send contract
router = express.Router();
router.post(myNodeReqApiPath, function (req, res, next) {
    try{
        const info = req.body.info;
        if (info == undefined){throw "Error:info == undefined";}
        const workerNode = Math.floor(Math.random() * careCenterChainNodeNum + 1);
        const node = {'workerNode': workerNode};
        let data = {info: info, node: node};
        data = JSON.stringify(data); // 傳入區塊鏈前 stringify

        /* 跨鏈呼叫合約 */
        careCenterContractHttp.methods.requestInfo(data)
        .send({from: myAccountAddress})
        .then(function (result) {
            console.log('**********  Request  **********');
            console.log(JSON.parse(data));
            console.log('Send to contract successfully!');
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
    console.log('Request Health Data API:', myNodeReqApiPath);
});
