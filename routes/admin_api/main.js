var express = require('express');
var router = express.Router();
const models = require('../../models');
var connection = require('../../config/db').conn;

//메인 페이지
router.get('/', async (req, res) => {
    let route = req.app.get('views') + '/ejs/admin/main.ejs';
    res.render(route, {
        sessionId: req.session.user.id
    });
});

module.exports = router;