const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "./.env"),
});

const Web3 = require("web3");
const rpc =
  "wss://polygon-mumbai.infura.io/ws/v3/cbabb2e79d6d4058816544b594e25341";

const web3 = new Web3(rpc);
const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function transact(gas, address, index) {
  web3.eth.accounts
    .signTransaction(
      {
        to: address,
        value: "1000000000",
        gas: "21000",
        nonce: index + 100,
        // maxPriorityFeePerGas: web3.utils.toWei("13", "wei"),
        // maxFeePerGas: web3.utils.toWei("40", "wei"),
      },
      PRIVATE_KEY
    )
    .then(async (s) => {
      web3.eth
        .sendSignedTransaction(s.rawTransaction)
        .on("receipt", (t) => {
          console.log(t.transactionHash, index + 1);
        })
        .on("error", (error) => console.log(error.message));
    })
    .catch((e) => {
      console.log("errored", e);
    });
}

module.exports = { transact };
