const express = require('express');
const router = express.Router();

const main = require('./main.js');
const contactUs = require('./contactUs.js');

router.use('/', main);
router.use('/user', contactUs);

module.exports = router;