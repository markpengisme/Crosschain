pragma solidity >=0.4.26;

contract BridgeNode {

    struct bridgeNode{
        string name;
        string ip;
        string accAddress;
        string chainID;
    }

    mapping (string => string) nameToChainID;
    mapping (string => bridgeNode[]) chainIDToBridgeNodeList;
    event otherOrgEvent(string name, string chainID);
    event bridgeNodeEvent(string name, string ip, string accAddress, string chainID);
    event removeEvent(string name, string ip, string accAddress, string chainID);
    event error(string msg);

    function registerOtherOrg(string memory _name, string memory _chainID) public {
        require(bytes(nameToChainID[_name]).length == 0, "Already register");
        nameToChainID[_name] = _chainID;
        emit otherOrgEvent(_name, _chainID);
    }

    function registerBridgeNode(string memory _name, string memory _ip, string memory _accAddress, string memory _chainID) public {
        require(bytes(nameToChainID[_name]).length == 0, "Already register");
        bridgeNode[] storage bridgeNodes = chainIDToBridgeNodeList[_chainID];
        bridgeNodes.push(bridgeNode(_name, _ip, _accAddress, _chainID));
        chainIDToBridgeNodeList[_chainID] = bridgeNodes;
        nameToChainID[_name] = _chainID;
        emit bridgeNodeEvent(_name, _ip, _accAddress, _chainID);
    }

    function remove(string memory _name, string memory _ip, string memory _chainID) public {
        uint len = chainIDToBridgeNodeList[_chainID].length;
        bridgeNode[] storage bridgeNodes = chainIDToBridgeNodeList[_chainID];
        for (uint i = 0; i < len - 1; i++){
            if (keccak256(abi.encodePacked((bridgeNodes[i].ip))) == keccak256(abi.encodePacked(_ip)) &&
                keccak256(abi.encodePacked((bridgeNodes[i].name))) == keccak256(abi.encodePacked(_name))){
                bridgeNode storage node = bridgeNodes[i];
                bridgeNodes[i] = bridgeNodes[len-1];
                delete bridgeNodes[len-1];
                chainIDToBridgeNodeList[_chainID] = bridgeNodes;
                emit removeEvent(node.name, node.ip, node.accAddress, node.chainID);
                return;
            }
        }
        emit error("no this node");
        return;
    }

    function namingService(string memory _name) public view returns(string memory){
        bytes memory chainID = bytes(nameToChainID[_name]);
        require(chainID.length != 0, "No such name!");
        return string(chainID);
    }
    
    function oneBridgeNode (string memory _ts, string memory _chainID) public view  returns(
        string memory name, string memory ip, string memory accAddress, string memory chainID
    ){
        uint rand = uint(keccak256(abi.encodePacked(_ts))) % chainIDToBridgeNodeList[_chainID].length;
        bridgeNode memory node = chainIDToBridgeNodeList[_chainID][rand];
        return (node.name, node.ip, node.accAddress, node.chainID);
    }
}
