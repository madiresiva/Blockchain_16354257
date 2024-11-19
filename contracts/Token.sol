// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    string public name = "My";
    string public symbol = "MHT";
    uint256 public totalSupply = 1000000;
    address public owner;
    mapping(address => uint256) public balanceOf;

    string public message;  // Variable to store the message

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event PaymentLogged(address indexed payer, uint256 amount, string message);
    event MessageUpdated(string oldMessage, string newMessage);  // Event to track message updates
    event AdminMessage(string message);  // Event for admin messages

    // Function to transfer tokens
    function transfer(address _to, uint256 _amount, string memory m) public {
        // Uncomment below if you want to validate balance and update balances
        // require(balanceOf[msg.sender] >= _amount, "Not enough tokens");
        // balanceOf[msg.sender] -= _amount;
        // balanceOf[_to] += _amount;
        
        string memory oldMessage = message;  // Save the old message
        message = m;  // Update the message
        emit MessageUpdated(oldMessage, m);  // Emit event to log the message update
        emit Transfer(msg.sender, _to, _amount);  // Log the transfer
    }

    // Function to update the message and emit an event
    function CourseBought(string memory _newMessage) public {
        string memory oldMessage = message;  // Save the old message
        message = _newMessage;  // Update the message
        emit MessageUpdated(oldMessage, _newMessage);  // Emit an event to log the message update
    }

    // Function to update the message and emit an event
    function CourseAdded(string memory _newMessage) public {
        string memory oldMessage = message;  // Save the old message
        message = _newMessage;  // Update the message
        emit MessageUpdated(oldMessage, _newMessage);  // Emit an event to log the message update
    }

    // Function to log an admin message
    function logAdminMessage(string memory _adminMessage) public {
        require(msg.sender == owner, "Only the owner can log admin messages");
        emit AdminMessage(_adminMessage);  // Emit an event for the admin message
    }
}
