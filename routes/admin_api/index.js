const express = require('express');
const router = express.Router();
// var session = require('express-session');

const login = require('./login.js');

router.use('/', login);

module.exports = router;