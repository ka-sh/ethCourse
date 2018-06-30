pragma solidity ^0.4.17;
contract Inbox{
    string public message;
   constructor(string initMsg) public{
        message=initMsg;
    }

    function setMessage(string newMsg) public {
        message=newMsg;
    }
}
