# 子三 - v1.0

## How to use?
1. Clone this repo in your computer.
2. Use [quorum-wizard](https://github.com/jpmorganchase/quorum-wizard) set up 3 blockchains(CareCenter, RelayChain, Hospital), and arrange ports according to `config.json`.
	- `Crosschain/network/CareCenter/config.json`
	- `Crosschain/network/RelayChain/config.json`
	- `Crosschain/network/Hospital/config.json`
3. After set up, quorum wizard will generate `start.sh` & `stop.sh` to control blockchain.
4. Use `package.json` in every node to install npm module,command: `npm install`.
5. Start up 3 blockchain,and compile the node2, node6, node10 contract files, and use `tool.sh` to share them.
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
    - node1
    - node12

## Future Tasks

- Smart Contract
	- Naming Service by chain-ID
		- Mapping chain-ID to account address list
		- Mapping account address to ip
	- More general approach to replace call api
		
	- Bridge Node White list and register method
	
- More Secure channels
- Dynamic Deploy Bridge nodes
