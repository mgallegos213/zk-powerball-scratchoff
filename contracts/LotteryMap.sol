// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Powerball {
    mapping(uint48 => address) public tickets;
    uint public prizePool;
    uint public constant TICKET_PRICE = 0.001 ether;

    function buyTicket(uint8[6] memory numbers) public payable {
        require(msg.value == TICKET_PRICE, "Insufficient payment");
        uint48 encoded = uint48(numbers[0]) << 40 |
                        uint48(numbers[1]) << 32 |
                        uint48(numbers[2]) << 24 |
                        uint48(numbers[3]) << 16 |
                        uint48(numbers[4]) << 8 |
                        uint48(numbers[5]);
        tickets[encoded] = msg.sender;
        prizePool += msg.value;
    }

    function drawNumbers() public {
        // Assume the numbers have already been randomly generated
        uint8[6] memory winningNumbers = [1, 2, 3, 4, 5, 6];
        uint48 encoded = uint48(winningNumbers[0]) << 40 |
                        uint48(winningNumbers[1]) << 32 |
                        uint48(winningNumbers[2]) << 24 |
                        uint48(winningNumbers[3]) << 16 |
                        uint48(winningNumbers[4]) << 8 |
                        uint48(winningNumbers[5]);
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
