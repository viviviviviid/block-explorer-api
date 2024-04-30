const block = require("./route");

module.exports = (app) => {
  app.use("/block/:height", block);
};
