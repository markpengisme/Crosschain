# 子三 - v2.0

## How to use?
1. Clone this repo in your computer.
2. Use [quorum-wizard](https://github.com/jpmorganchase/quorum-wizard) set up 3 blockchains(CareCenter, RelayChain, Hospital), and arrange ports according to `config.json`.
	- `Crosschain/network/CareCenter/config.json`
	- `Crosschain/network/RelayChain/config.json`
	- `Crosschain/network/Hospital/config.json`
3. After set up, quorum wizard will generate `start.sh` & `stop.sh` to control blockchain.
4. Use `package.json` in every node to install npm module,command: `npm install`.
5. Use `tool.sh` to do
	- Compile node2, node6, node10 smart contracts, and distribute to other node in same chain.
	- Initiate node data in three chain by `init-node.js` in node2, node6, node10.
6. Set up your `config.js` in node1 ~ node12.
7. Start up all the node.
8. Use postman to import `cross-chain.postman_collection.json`, and test crosschain function by those POST request.

## Notice

- quorum(raft) + web3js.websocket = still bug(timestamp nanoseconds bug) -> [issue](https://github.com/ethereum/web3.js/issues/3442)

- Compile two way
    1. Use compile.js
    2. Use remix + quorum plugin 
- After compile `.sol` file, you ==must to== give `CONTRACT.JSON` for other node , because they need the `ABI` and the `Contract address`.
- Bridge Node (if the node in same chain, only `config.js` is different)
    - node2 = node3 = node4 
    - node5 = node6 = node7 = node8
    - node9 = node10 = node11
- Client Node
    - node1 ~= node12

## Future Tasks
- More Secure channels
	- ECDH and check ip
- Dynamic Deploy Bridge nodes
	- k8s stafulset
