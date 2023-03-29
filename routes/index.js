var express = require('express');
var router = express.Router();

const fs = require('fs')

const { ThirdwebSDK } = require('@thirdweb-dev/sdk');
const { Mumbai } = require('@thirdweb-dev/chains');

const { Polybase } = require('@polybase/client');

const myAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint48",
				"name": "encoded",
				"type": "uint48"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8[6]",
				"name": "winningNumbers",
				"type": "uint8[6]"
			}
		],
		"name": "DrawingResult",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "TICKET_PRICE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8[6]",
				"name": "numbers",
				"type": "uint8[6]"
			}
		],
		"name": "buyTicket",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "drawNumbers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "prizePool",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint48",
				"name": "",
				"type": "uint48"
			}
		],
		"name": "tickets",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isWinner",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

const sdk = new ThirdwebSDK(
  Mumbai,
);

const db = new Polybase({
	defaultNamespace: "pk/0x172d0af6327c6435caff388640dcaf6debe07210103a62ba10133ffddf31caf9ba2d0cdd78b536c289c8d272527397aa26ac11965fc007f32d944408e6c98874/Powerball",
});

const ticketCollection = db.collection("Ticket");
const drawingCollection = db.collection("Drawing");

async function createTicketRecord(numbers, buyer) {
	const recordData = await ticketCollection.create([
	  numbers[0],
	  numbers[1],
	  numbers[2],
	  numbers[3],
	  numbers[4],
	  numbers[5],
	  db.collection("User").record(buyer)
	]);
	console.log("Created ticket record:", recordData);
  }
  
  async function createDrawingRecord(winningNumbers) {
	const recordData = await drawingCollection.create([
	  winningNumbers[0],
	  winningNumbers[1],
	  winningNumbers[2],
	  winningNumbers[3],
	  winningNumbers[4],
	  winningNumbers[5]
	]);
	console.log("Created drawing record:", recordData);
  }

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Michaels Express App' });
});

router.get("/list_movies", async (req, res) => {
  fs.readFile(__dirname + '/' + 'movies.json', 'utf8', (err, data) => {
      res.end(data);
  });
});

router.get("/contract", async (req, res) => {
	try {
	  const contract = await sdk.getContractFromAbi("0x8fb4afda5f9eab08e86bf101b00f95fb41463bd7", myAbi);
	  const result = await contract.call("get");
	  const data = result.toString(); // Convert BigNumber to string
	  // ^ Remove .toString() to output the raw data, will be in this format: BigNumber { _hex: '0x05', _isBigNumber: true }
	  console.log(data);
	  return res.send(data);
	} catch (error) {
	  console.error(error);
	  return res.status(500).send({ error: "Something went wrong" });
	}
  });

  router.get("/draw_powerball", async (req, res) => {
	// TODO - Store the purchased tickets
	// Note: These are currently stored in a mapping. Maybe we can listen for the new TicketBought event.
	try {
	  const contract = await sdk.getContractFromAbi("0x8fb4afda5f9eab08e86bf101b00f95fb41463bd7", myAbi);
	  const result = await contract.call("get");
	  const data = result.toString(); // Convert BigNumber to string
	  // ^ Remove .toString() to output the raw data, will be in this format: BigNumber { _hex: '0x05', _isBigNumber: true }
	  console.log(data);
	  return res.send(data);
	} catch (error) {
	  console.error(error);
	  return res.status(500).send({ error: "Something went wrong" });
	}
  });
  


module.exports = router;
