const express = require('express');
const router = express.Router();
// var session = require('express-session');

const login = require('./login.js');
const main = require('./main.js');

router.use('/', login);
router.use('/main', main);


module.exports = router;