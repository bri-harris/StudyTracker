const express = require("express");
const router = express.Router();
const authCtrl = require("../ctrls/authCtrl");

router.post("/", authCtrl.handleLogin);

module.exports = router