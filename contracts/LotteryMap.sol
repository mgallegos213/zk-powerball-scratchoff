// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Powerball {
    mapping(bytes => address) public tickets;
    uint public prizePool;
    uint public constant TICKET_PRICE = 0.001 ether;

    constructor() payable {}

    function buyTicket(uint8[6] memory numbers) public payable {
        require(msg.value >= TICKET_PRICE, "Insufficient payment");
        bytes memory encoded = abi.encodePacked(numbers);
        tickets[encoded] = msg.sender;
        prizePool += msg.value;
    }

    function drawNumbers() public {
        // Assume the numbers have already been randomly generated
        uint8[6] memory winningNumbers = [1, 2, 3, 4, 5, 6];
        bytes memory encoded = abi.encodePacked(winningNumbers);
        address winner = tickets[encoded];
        if (winner != address(0)) {
            uint prize = prizePool;
            prizePool = 0;
            payable(winner).transfer(prize);
        }
    }
    
    receive() external payable {
        // do nothing for now
    }
}
