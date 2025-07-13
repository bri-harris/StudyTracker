const express = require("express");
const router = express.Router();
const refreshCtrl = require("../ctrls/refreshCtrl");

router.get("/", refreshCtrl.handleRefreshToken);

module.exports = router