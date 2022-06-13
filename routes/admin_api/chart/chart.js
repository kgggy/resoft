var express = require('express');
var router = express.Router();
var connection = require('../../../config/db').conn;

//메인 페이지
router.get('/main', async (req, res) => {
    let route = req.app.get('views') + '/ejs/admin/chart/chart.ejs';
    res.render(route);
});

module.exports = router;