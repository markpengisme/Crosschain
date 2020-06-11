const fs = require('fs');
const web3 = require('web3');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const config = require("./config.js");

// contract build -> 合約ABI & 合約Address
const compiled = JSON.parse(fs.readFileSync("./contracts/" + config.contractName + ".json", "UTF-8"));
const hospitalContractABI = compiled.abi;
const hospitalContractAddress = compiled.contractAddress;

// chainID, address, careCenter name, nodeNumber
const chainID = config.chainID;
const myAccountAddress = config.myAccountAddress;
const myHospitalName = config.myHospitalName;
const hospitalChainNodeNum = config.hospitalChainNodeNum;

// IP, port, web3 provider, req-API
const myNode = config.myNode;
const myNodeApiPort = config.myNodeApiPort;
const myNodeResApiPath = config.myNodeResApiPath;

// web3 & contract instance
// http: send transaction
// ws: listen event
const hospitalWeb3Http = new web3(config.web3HttpProvider);
const hospitalContractHttp = new hospitalWeb3Http.eth.Contract(hospitalContractABI, hospitalContractAddress);
const hospitalWeb3Ws = new web3(config.web3WsProvider);
const hospitalContractWs = new hospitalWeb3Ws.eth.Contract(hospitalContractABI, hospitalContractAddress);

// 開始監聽合約事件
console.log('Web3 provider start to listen!');

// 接收跨鏈請求 by listen contract event -> call gateway server API
hospitalContractWs.events.requestEvent({}, function (error, result) {
    if (error === null) {
        // 監聽器拿到資料
        let info = result.returnValues.info;
        info = JSON.parse(info);
        console.log('Listen to event successfully!');
        console.log('**********  Request  **********');

        // 拿到的醫院名字剛好是自己的醫院名字,代表該工作
        if (info['destination'] === myHospitalName) {
            console.log(myHospitalName, "終於拿到資料...:", info);
            // TODO: 轉發資料給自己的的Resource Server
            // // 直接接發給自己
            // info['phr'] = 'healthy';
            // [info['source'],info['destination']]=[info['destination'],info['source']];
            // request({ 
            //     method: 'POST',
            //     uri: myNode + myNodeResApiPath,
            //     json: true,
            //     headers: {
            //         "content-type": "application/json",
            //     },
            //     body: {info}
            //     },
            //     function (error, response, body) {
            //         if (error) {
            //             console.log('Send to bridgenode failed:', error);
            //         } else {
            //             console.log('Send to bridgenode successfully! Server responded with:', body);
            //         }
            //     })
        } else {
            console.log('不是我該做的....')
        }
    } else {
        console.log('listen error:', error)
    }
});

// 回覆跨鏈請求 by API -> send response contract
router = express.Router();
router.post(myNodeResApiPath, function (req, res, next) {
    try{
        const info = req.body.info;
        if (info == undefined){throw "Error:info == undefined";}
        const workerNode = Math.floor(Math.random() * hospitalChainNodeNum + 1);
        const node = {'workerNode': workerNode};
        let data = {'info': info, 'node': node};
        data = JSON.stringify(data); // 傳入區塊鏈前 stringify
        
        /* 跨鏈呼叫合約 */
        hospitalContractHttp.methods.responseInfo(data)
        .send({from: myAccountAddress})
        .then(function (result) {
            console.log('**********  Response  **********');
            console.log(JSON.parse(data));
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
    console.log('Hospital Name:', myHospitalName);
    console.log('Response Health Data API:', myNodeResApiPath);
});
