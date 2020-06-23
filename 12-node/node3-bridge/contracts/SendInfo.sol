pragma solidity >=0.4.26;

contract SendInfo {
    event infoEvent(string data);
    function sendInfo(string memory _data) public {
        emit infoEvent(_data);
    }
}
