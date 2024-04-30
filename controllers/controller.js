require("dotenv").config();
const axios = require("axios");

const blockExplorer = async (req, res) => {
  console.log("/block")
  try {
    const blockHeight = req.params.height;
    const block = await axios.post(
      `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`, 
      {
        "jsonrpc":"2.0", "method":"eth_getBlockByNumber", "params":[`0x${parseInt(blockHeight).toString(16)}`, false], "id":1
      }
    )
    res.json(block.data);
  } catch(err) {
    console.log("blockExplorer function error: ", err);
    res.status(400).send(err);
  }
}

module.exports = { 
  blockExplorer
}