#!/bin/bash

# This shell script is use to
# 1. Compile node2, node6, node10 smart contracts, and distribute to other node in same chain.
# 2. Initiate node data in three chain by `init-node.js` in node2, node6, node10.

# My BridgeNode.sol are all same so
cp ./node2-bridge/contracts/BridgeNode.sol ./node6-bridge/contracts/BridgeNode.sol
cp ./node2-bridge/contracts/BridgeNode.sol ./node10-bridge/contracts/BridgeNode.sol

# Compile
cd node2-bridge && node compile.js && cd ..
cd node6-bridge && node compile.js && cd ..
cd node10-bridge && node compile.js && cd ..

# Distribute SendInfo contract & BridgeNode Contract
cp ./node2-bridge/contracts/SendInfo.sol ./node1-client/contracts/SendInfo.sol
cp ./node2-bridge/contracts/SendInfo.json ./node1-client/contracts/SendInfo.json
cp ./node2-bridge/contracts/SendInfo.sol ./node3-bridge/contracts/SendInfo.sol
cp ./node2-bridge/contracts/SendInfo.json ./node3-bridge/contracts/SendInfo.json
cp ./node2-bridge/contracts/SendInfo.sol ./node4-bridge/contracts/SendInfo.sol
cp ./node2-bridge/contracts/SendInfo.json ./node4-bridge/contracts/SendInfo.json
cp ./node2-bridge/contracts/BridgeNode.sol ./node1-client/contracts/BridgeNode.sol
cp ./node2-bridge/contracts/BridgeNode.json ./node1-client/contracts/BridgeNode.json
cp ./node2-bridge/contracts/BridgeNode.sol ./node3-bridge/contracts/BridgeNode.sol
cp ./node2-bridge/contracts/BridgeNode.json ./node3-bridge/contracts/BridgeNode.json
cp ./node2-bridge/contracts/BridgeNode.sol ./node4-bridge/contracts/BridgeNode.sol
cp ./node2-bridge/contracts/BridgeNode.json ./node4-bridge/contracts/BridgeNode.json

cp ./node6-bridge/contracts/SendInfo.sol ./node5-bridge/contracts/SendInfo.sol
cp ./node6-bridge/contracts/SendInfo.json ./node5-bridge/contracts/SendInfo.json
cp ./node6-bridge/contracts/SendInfo.sol ./node7-bridge/contracts/SendInfo.sol
cp ./node6-bridge/contracts/SendInfo.json ./node7-bridge/contracts/SendInfo.json
cp ./node6-bridge/contracts/SendInfo.sol ./node8-bridge/contracts/SendInfo.sol
cp ./node6-bridge/contracts/SendInfo.json ./node8-bridge/contracts/SendInfo.json
cp ./node6-bridge/contracts/BridgeNode.sol ./node5-bridge/contracts/BridgeNode.sol
cp ./node6-bridge/contracts/BridgeNode.json ./node5-bridge/contracts/BridgeNode.json
cp ./node6-bridge/contracts/BridgeNode.sol ./node7-bridge/contracts/BridgeNode.sol
cp ./node6-bridge/contracts/BridgeNode.json ./node7-bridge/contracts/BridgeNode.json
cp ./node6-bridge/contracts/BridgeNode.sol ./node8-bridge/contracts/BridgeNode.sol
cp ./node6-bridge/contracts/BridgeNode.json ./node8-bridge/contracts/BridgeNode.json

cp ./node10-bridge/contracts/SendInfo.sol ./node9-bridge/contracts/SendInfo.sol
cp ./node10-bridge/contracts/SendInfo.json ./node9-bridge/contracts/SendInfo.json
cp ./node10-bridge/contracts/SendInfo.sol ./node11-bridge/contracts/SendInfo.sol
cp ./node10-bridge/contracts/SendInfo.json ./node11-bridge/contracts/SendInfo.json
cp ./node10-bridge/contracts/SendInfo.sol ./node12-client/contracts/SendInfo.sol
cp ./node10-bridge/contracts/SendInfo.json ./node12-client/contracts/SendInfo.json
cp ./node10-bridge/contracts/BridgeNode.sol ./node9-bridge/contracts/BridgeNode.sol
cp ./node10-bridge/contracts/BridgeNode.json ./node9-bridge/contracts/BridgeNode.json
cp ./node10-bridge/contracts/BridgeNode.sol ./node11-bridge/contracts/BridgeNode.sol
cp ./node10-bridge/contracts/BridgeNode.json ./node11-bridge/contracts/BridgeNode.json
cp ./node10-bridge/contracts/BridgeNode.sol ./node12-client/contracts/BridgeNode.sol
cp ./node10-bridge/contracts/BridgeNode.json ./node12-client/contracts/BridgeNode.json


# Initiate node data
cd node2-bridge && node init-node.js && cd ..
cd node6-bridge && node init-node.js && cd ..
cd node10-bridge && node init-node.js && cd ..