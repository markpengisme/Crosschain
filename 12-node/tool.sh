#!/bin/bash

cd node2-bridge && node compile.js && cd ..
cd node6-bridge && node compile.js && cd ..
cd node10-bridge && node compile.js && cd ..

cp ./node2-bridge/contracts/CareCenter.sol ./node1-client/contracts/CareCenter.sol
cp ./node2-bridge/contracts/CareCenter.json ./node1-client/contracts/CareCenter.json
cp ./node2-bridge/contracts/CareCenter.sol ./node3-bridge/contracts/CareCenter.sol
cp ./node2-bridge/contracts/CareCenter.json ./node3-bridge/contracts/CareCenter.json
cp ./node2-bridge/contracts/CareCenter.sol ./node4-bridge/contracts/CareCenter.sol
cp ./node2-bridge/contracts/CareCenter.json ./node4-bridge/contracts/CareCenter.json

cp ./node6-bridge/contracts/RelayChain.sol ./node5-bridge/contracts/RelayChain.sol
cp ./node6-bridge/contracts/RelayChain.json ./node5-bridge/contracts/RelayChain.json
cp ./node6-bridge/contracts/RelayChain.sol ./node7-bridge/contracts/RelayChain.sol
cp ./node6-bridge/contracts/RelayChain.json ./node7-bridge/contracts/RelayChain.json
cp ./node6-bridge/contracts/RelayChain.sol ./node8-bridge/contracts/RelayChain.sol
cp ./node6-bridge/contracts/RelayChain.json ./node8-bridge/contracts/RelayChain.json

cp ./node10-bridge/contracts/Hospital.sol ./node9-bridge/contracts/Hospital.sol
cp ./node10-bridge/contracts/Hospital.json ./node9-bridge/contracts/Hospital.json
cp ./node10-bridge/contracts/Hospital.sol ./node11-bridge/contracts/Hospital.sol
cp ./node10-bridge/contracts/Hospital.json ./node11-bridge/contracts/Hospital.json
cp ./node10-bridge/contracts/Hospital.sol ./node12-client/contracts/Hospital.sol
cp ./node10-bridge/contracts/Hospital.json ./node12-client/contracts/Hospital.json