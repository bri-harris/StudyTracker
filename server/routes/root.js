const express = require('express')
const router = express.Router();

// if user is logged in give a unique experience, must check if logged in

//stand in code
router.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = router;