const router = require("express").Router();
const block = require("../controllers/controller");

// GET
router.get("/:height", block.blockExplorer);
router.get("/:height/address/:address", block.addressTracker);

module.exports = router;