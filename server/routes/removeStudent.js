const express = require('express');
const router = express.Router();
const { handleDeleteUser } = require('../ctrls/deleteUserCtrl');

router.delete('/removeStudent/:userId', handleDeleteUser);

module.exports = router;
