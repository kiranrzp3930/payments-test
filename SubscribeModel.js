const path = require("path");
const Web3 = require("web3");
const fs = require("fs");
const rpc =
  "wss://polygon-mumbai.infura.io/ws/v3/cbabb2e79d6d4058816544b594e25341";
const web3 = new Web3(rpc);

var stream = fs.createWriteStream(path.join(__dirname, "/done.txt"), {
  flags: "a",
});

class Subscribe {
  subscription;
  constructor(uid, address) {
    this.uid = uid;
    this.address = address;
    this.createSubscription();
  }

  async createSubscription() {
    const subscription = (this.subscription = web3.eth
      .subscribe(
        "logs",
        {
          topics: [
            "0xe6497e3ee548a3372136af2fcb0696db31fc6cf20260707645068bd3fe97f3c4",
            null,
            null,
            web3.utils.padLeft(this.address.toLowerCase(), 64),
          ],
        },
        function (error, result) {
          if (error) console.log(error);
          console.log(result.transactionHash);
          subscription.unsubscribe(function (error, success) {
            if (success) console.log("Successfully unsubscribed!");
            stream.write(result.transactionHash + "\n");
          });
        }
      )
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
      }));
  }
}

module.exports = { Subscribe };
