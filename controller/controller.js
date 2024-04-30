require("dotenv").config();
const axios = require("axios");

console.log("controller")

const blockExplorer = async (req, res) => {
  console.log("/block")
  try {
    const blockHeight = req.params.height;
    const block = await axios.post(
      `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`, 
      {
        "jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x5BAD55",false],"id":1
      }
    )
    .then(res.json(block))
  } catch(err) {
    console.log("blockExplorer function error: ", err);
    res.status(400).send(err);
  }
}

module.exports = { 
  blockExplorer
}