const express = require("express");
const router = express.Router();
const logoutCtrl = require("../ctrls/logoutCtrl");

router.get("/", logoutCtrl.handleLogout);

module.exports = router