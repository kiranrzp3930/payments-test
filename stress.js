const Web3 = require("web3");
const { transact } = require("./transactions");
const rpc =
  "wss://polygon-mumbai.infura.io/ws/v3/c731d68b09e6477fa3c86fa92380133e";
const web3 = new Web3(rpc);
const fs = require("fs");
const path = require("path");

let wallets = [];
var stream = fs.createWriteStream(path.join(__dirname, "/done.txt"), {
  flags: "a",
});

async function test() {
  const gas = await web3.eth.getGasPrice();

  // Create Wallets
  for (let i = 0; i < 100; i++) {
    const account = web3.eth.accounts.create();
    wallets.push(account);
  }

  fs.writeFileSync(
    path.join(__dirname, "/address.txt"),
    wallets.map((e) => `"${e.address}"`).toString()
  );
  // Create Listeners
  for (let j = 0; j < wallets.length; j++) {
    const subscription = web3.eth
      .subscribe(
        "logs",
        {
          topics: [
            "0xe6497e3ee548a3372136af2fcb0696db31fc6cf20260707645068bd3fe97f3c4",
            null,
            null,
            web3.utils.padLeft(wallets[j].address.toLowerCase(), 64),
          ],
        },
        function (error, result) {
          if (error) console.log(error);
          console.log(result.transactionHash);
          subscription.unsubscribe(function (error, success) {
            if (success) console.log("Successfully unsubscribed!", j + 1);
            stream.write(j + 1 + "\n");
          });
        }
      )
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId, j + 1);
      });
  }

  for (let k = 0; k < wallets.length; k++) {
    const address = wallets[k].address;
    // transact(gas, address, k);
  }
}

test();
