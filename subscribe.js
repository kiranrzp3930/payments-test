const Web3 = require("web3");
const rpc =
	"wss://polygon-mumbai.infura.io/ws/v3/cbabb2e79d6d4058816544b594e25341";

const web3 = new Web3(rpc);

var subscription = web3.eth
	.subscribe(
		"logs",
		{
			topics: [
				"0xe6497e3ee548a3372136af2fcb0696db31fc6cf20260707645068bd3fe97f3c4",
				null,
				null,
				"0x0000000000000000000000003b18dca02fa6945acbbe2732d8942781b410e0f9",
			],
		},
		function (error, result) {
			if (error) console.log(error);
			console.log(result.transactionHash);
			subscription.unsubscribe(function (error, success) {
				if (success) console.log("Successfully unsubscribed!");
			});
		}
	)
	.on("connected", function (subscriptionId) {
		console.log(subscriptionId);
	});

// web3.eth
// 	.getPastLogs({
// 		fromBlock: 44713416,
// 		toBlock: 44713417,
// 		topics: [
// 			"0xe6497e3ee548a3372136af2fcb0696db31fc6cf20260707645068bd3fe97f3c4",
// 			null,
// 			null,
// 			"0x0000000000000000000000003b18dca02fa6945acbbe2732d8942781b410e0f9",
// 		],
// 	})
// 	.then((res) => {
// 		console.log(res);
// 	});
