const express = require('express')
const router = express.Router();

//stand in code
router.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = router;