require("dotenv").config();
const axios = require("axios");

const fetchBlockData = async (blockHeight) => {
  try {
    const response = await axios.post(
      `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      {
        "jsonrpc": "2.0", 
        "method": "eth_getBlockByNumber", 
        "params": [`0x${parseInt(blockHeight).toString(16)}`, true], 
        "id": 1
      }
    );
    return response.data;
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

const addressTracker = async (req, res) => {
  console.log("/address");
  try {
    const { address, height } = req.params;
    const txs = (await fetchBlockData(height)).result.transactions;

    var result = [0,0,0];                               // [to_Value, from_Value, gasPrice]
    txs.forEach(el => {
      if(el.to !== address && el.from !== address)
        return;
  
      const value = parseInt(el.value, 16);
      const gas = parseInt(el.gas, 16); 
      // if 두개로 한 이유 : 입금자와 출금자가 같은 경우도 고려
      if (el.to === address) { // 입금대상자일때
        result[0] += value;
        result[2] += gas;
      }
      if (el.from === address) { // 출금자일때
        result[1] += value;
        result[2] += gas;
      }
    })
    
    res.json({
      "Address": address,
      "Block Height": height,
      "Inflow Value": result[0] + " wei",
      "Outflow Value": result[1] + " wei",
      "Value Summary": (result[0] - result[1]) + " wei",
      "Fee Summary": result[2] + " wei"
    });
  } catch(err) {
    console.error("addressTracker function error: ", err);
    res.status(400).send(err)
  }
}

module.exports = { fetchBlockData, blockExplorer, addressTracker }

// 예시 http://localhost:5001/block/1977423/address/0xea674fdde714fd979de3edf0f56aa9716b898ec8