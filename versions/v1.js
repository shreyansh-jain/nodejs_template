const express = require("express");
const router = express.Router();

// Product Route Point
const template = require('../routes/templateRoute')

// API Call For Product
router.use('/template', template)

module.exports = router;
