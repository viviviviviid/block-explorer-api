const router = require("express").Router();
const controller = require("../controllers/controller");

// GET
router.get("/:height", controller.blockExplorer);

module.exports = router;