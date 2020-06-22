pragma solidity >0.4.25;

contract Hospital {
    event requestEvent(string info);
    event responseEvent(string info);

    function requestInfo(string memory _info) public {
        emit requestEvent(_info);
    }

    function responseInfo(string memory _info) public {
        emit responseEvent(_info);
    }
}