require("dotenv").config();
const axios = require("axios");
const { fetchBlockData } = require("./block.controller")
const { utils } = require("../utils/utils")

const addressTracker = async (req, res) => {
  console.log("/address");
  try {
    const { address, height } = req.params;
    const unit = req.query.unit || 'wei'; // 원하는 단위가 없을 경우, 기본값으로 'wei' 사용
    
    const txs = (await fetchBlockData(height)).result.transactions;

    // [Inflow Value, Outflow Value, Fee Summary]
    var valArr = [0,0,0]; 

    txs.forEach(el => {
      if(el.to !== address && el.from !== address) return;
      const value = parseInt(el.value, 16);
      const gas = parseInt(el.gas, 16); 

      // if 두개로 한 이유 : 입금자와 출금자가 같은 경우도 고려
      if (el.to === address) {   // 입금대상자일때
        valArr[0] += value;
        valArr[2] += gas;
      }
      if (el.from === address) { // 출금자일때
        valArr[1] += value;
        valArr[2] += gas;
      }
    })
 
    const result = convertUnits(unit, valArr);
    respondWithFormattedJson(address, height, unit, result, res);
    
  } catch(err) {
    console.error("addressTracker function error: ", err);
    res.status(400).send(err)
  }
}

const convertUnits = (unit, values) => {
  if (unit === 'wei') return values;
  const functionName = `weiTo${unit}`;
  return typeof utils[functionName] === 'function' ? values.map(utils[functionName]) : values;
};

const respondWithFormattedJson = (address, height, unit, values, res) => {
  const [inflow, outflow, fee] = values;
  res.json({
    "Address": address,
    "Block Height": height,
    "Inflow Value": `${inflow} ${unit}`,
    "Outflow Value": `${outflow} ${unit}`,
    "Value Summary": `${inflow - outflow} ${unit}`,
    "Fee Summary": `${fee} ${unit}`
  });
}

module.exports = { addressTracker }

// 예시 http://localhost:5001/block/1977423/address/0xea674fdde714fd979de3edf0f56aa9716b898ec8