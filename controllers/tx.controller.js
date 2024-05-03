require("dotenv").config();
const axios = require("axios");
const { fetchBlockData } = require("./block.controller")
const utils = require("../utils/utils")

const addressTracker = async (req, res) => {
  console.log("/address");
  try {
    const { address, height } = req.params;
    const txs = (await fetchBlockData(height)).result.transactions;

    var result = [0,0,0];        // [Inflow Value, Outflow Value, Fee Summary]
    txs.forEach(el => {
      if(el.to !== address && el.from !== address) return;
  
      const value = parseInt(el.value, 16);
      const gas = parseInt(el.gas, 16); 

      // if 두개로 한 이유 : 입금자와 출금자가 같은 경우도 고려
      if (el.to === address) {   // 입금대상자일때
        result[0] += value;
        result[2] += gas;
      }
      if (el.from === address) { // 출금자일때
        result[1] += value;
        result[2] += gas;
      }
    })
    result = [utils.weiToEther(result[0]),utils.weiToEther(result[1]),utils.weiToGwei(result[2])]
    
    res.json({
      "Address": address,
      "Block Height": height,
      "Inflow Value": `${result[0].toFixed(4)} ETH`,
      "Outflow Value": `${result[1].toFixed(4)} ETH`,
      "Value Summary": `${(result[0] - result[1]).toFixed(4)} ETH`,
      "Fee Summary": `${result[2]} Gwei`
    });
  } catch(err) {
    console.error("addressTracker function error: ", err);
    res.status(400).send(err)
  }
}

module.exports = { addressTracker }

// 예시 http://localhost:5001/block/1977423/address/0xea674fdde714fd979de3edf0f56aa9716b898ec8