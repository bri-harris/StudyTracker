const express = require("express");
const router = express.Router();
const registerCtrl = require("../ctrls/registerCtrl");

router.post("/", registerCtrl.handleNewUser);

module.exports = router