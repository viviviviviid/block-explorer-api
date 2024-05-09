const utils = {
  weiToeth: function(wei) {
      return wei / 1e18;
  },
  weiTogwei: function(wei) {
      return wei / 1e9;
  }
};

module.exports = { utils };