var express = require('express');
var router = express.Router();

const fs = require('fs')

const { ThirdwebSDK } = require('@thirdweb-dev/sdk');
const { Mumbai } = require('@thirdweb-dev/chains');

const myAbi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get",
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
		"inputs": [],
		"name": "num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const sdk = new ThirdwebSDK(
  Mumbai,
);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Michaels Express App' });
});

router.get("/list_movies", (req, res) => {
  fs.readFile(__dirname + '/' + 'movies.json', 'utf8', (err, data) => {
      res.end(data);
  });
  // const contract = await sdk.getContractFromAbi("0x8fb4afda5f9eab08e86bf101b00f95fb41463bd7", myAbi);
  // const data = await contract.call(
  //   "get", // Name of your function as it is on the smart contract
  // );
  // return data;
});


module.exports = router;
