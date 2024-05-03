
function weiToEther(wei) {
  return wei / 1e18; 
}

function weiToGwei(wei) {
  return wei / 1e9;
}

module.exports = { weiToEther, weiToGwei };