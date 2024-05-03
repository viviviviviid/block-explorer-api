const router = require("express").Router();
const tx = require("../controllers/tx.controller")
const block = require("../controllers/block.controller");

// GET
router.get("/:height", block.blockExplorer);
router.get("/:height/address/:address", tx.addressTracker);

module.exports = router;