# Quorum-wizard lab

## Notice

- quorum(raft) + web3js.websocket = still bug(timestamp nanoseconds bug) -> [issue](https://github.com/ethereum/web3.js/issues/3442)

- Compile two way
    1. Use compile.js
    2. Use remix + quorum plugin 
- After compile `.sol` file, you ==must to== give `CONTRACT.JSON` for other node , because they need the `ABI` and the `Contract address`.
- Bridge Node (if the node in same chain, onle `config.js` is different)
    - node2 = node3 = node4 
    - node5 = node6 = node7 = node8
    - node9 = node10 = node11
- Client Node
    - node1
    - node12
