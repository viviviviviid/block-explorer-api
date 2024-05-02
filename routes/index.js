const routes = require("./route");

module.exports = (app) => {
  app.use("/block", routes);
};
