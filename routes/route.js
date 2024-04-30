const router = require("express").Router();
const controller = require("../controller/controller");

// GET
router.get("/block/:height", controller.blockExplorer);

module.exports = router;