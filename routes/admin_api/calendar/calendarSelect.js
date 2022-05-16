var express = require('express');
var router = express.Router();
var connection = require('../../../config/db').conn;

//메인 페이지
router.get('/main', async (req, res) => {
    let route = req.app.get('views') + '/ejs/admin/calendar/calendar.ejs';
    res.render(route);
});

//일정 전체 가져오기
router.get('/', async (req, res) => {
    try {
        const sql1 = "select *, date_add(end, interval 1 day) as end from calendar;";
        connection.query(sql1, (err, results) => {
            if (err) {
                throw err;
            }
            // console.log(results)
            res.send({
                results
            });
        });
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;