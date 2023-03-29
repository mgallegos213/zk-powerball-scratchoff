// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Powerball {
    struct Ticket {
        address owner;
        uint8[6] numbers;
        bool isWinner;
    }

    mapping(uint48 => Ticket) public tickets;
    uint public prizePool;
    uint public constant TICKET_PRICE = 0.001 ether;

    uint8[6] public winningNumbers; // Store the latest drawn numbers

    function buyTicket(uint8[6] memory numbers) public payable {
        require(msg.value == TICKET_PRICE, "Insufficient payment");
        uint48 encoded = uint48(numbers[0]) << 40 |
                        uint48(numbers[1]) << 32 |
                        uint48(numbers[2]) << 24 |
                        uint48(numbers[3]) << 16 |
                        uint48(numbers[4]) << 8 |
                        uint48(numbers[5]);
        tickets[encoded] = Ticket(msg.sender, numbers, false);
        prizePool += msg.value;
        emit TicketBought(encoded, msg.sender);
    }

    function drawNumbers() public {
        // Assume the numbers have already been randomly generated
        winningNumbers = [1, 2, 3, 4, 5, 6];
        uint48 encoded = uint48(winningNumbers[0]) << 40 |
                        uint48(winningNumbers[1]) << 32 |
                        uint48(winningNumbers[2]) << 24 |
                        uint48(winningNumbers[3]) << 16 |
                        uint48(winningNumbers[4]) << 8 |
                        uint48(winningNumbers[5]);
        Ticket storage winningTicket = tickets[encoded];
        if (winningTicket.owner != address(0)) {
            winningTicket.isWinner = true;
            uint prize = prizePool;
            prizePool = 0;
            payable(winningTicket.owner).transfer(prize);
        }
        emit DrawingResult(encoded, winningTicket.owner, winningNumbers);
    }

    event TicketBought(uint48 ticket, address buyer);

    event DrawingResult(uint48 encoded, address winner, uint8[6] winningNumbers);

    receive() external payable {
        // do nothing for now
    }

    function getLatestWinningNumbers() public view returns (uint8[6] memory) {
        return winningNumbers;
    }
}
