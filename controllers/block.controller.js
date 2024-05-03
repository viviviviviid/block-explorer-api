require("dotenv").config();
const axios = require("axios");

const fetchBlockData = async (blockHeight) => {
  try {
    const blockData = await axios.post(
      `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      {
        "jsonrpc": "2.0", 
        "method": "eth_getBlockByNumber", 
        "params": [`0x${parseInt(blockHeight).toString(16)}`, true], 
        "id": 1
      }
    );
    return blockData.data;
  } catch (err) {
    console.error("fetchBlockData function error:", err);
    throw err;
  }
}

const blockExplorer = async (req, res) => {
  console.log("/block");
  try {
    const blockData = await fetchBlockData(req.params.height);
    res.json(blockData);
  } catch(err) {
    console.error("blockExplorer function error: ", err)
    res.status(400).send("blockExplorer function error: ", err);
  }
}

module.exports = { fetchBlockData, blockExplorer }

// 예시 http://localhost:5001/block/1977423/address/0xea674fdde714fd979de3edf0f56aa9716b898ec8