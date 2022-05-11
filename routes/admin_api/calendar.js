var express = require('express');
var router = express.Router();
var connection = require('../../config/db').conn;
var moment = require('moment');

//메인 페이지
router.get('/', async (req, res) => {
    let route = req.app.get('views') + '/ejs/admin/calendar/calendar.ejs';
    res.render(route);
});

//일정 전체 가져오기
router.get('/select', async (req, res) => {
    try {
        const sql1 = "select *, date_add(end, interval 1 second) as end from calendar;";
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

//일정 상세보기
router.get('/selectOne', async (req, res) => {
    try {
        const param = req.query.calendarId;
        const sql1 = "select title, calendarDiv, date_format(start, '%Y-%m-%d') as start,\
                             date_format(date_add(end, interval 1 second), '%Y-%m-%d') as end\
                        from calendar where calendarId = ?;";
        connection.query(sql1, param, (err, results) => {
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

//일정 추가
router.post('/insert', async (req, res) => {
    try {
        // console.log(req.body.obj)
        const data = req.body.obj;
        // console.log(data)
        const sql = "insert into calendar (title, start, end, calendarDiv) values(?, ?, ?, ?)";
        const param = [data.title, data.start, data.end, data.calendarDiv];
        connection.query(sql, param, (err) => {
            if (err) {
                throw err;
            }
            res.send({msg: "success"});
        });

    } catch (error) {
        res.send(error.message);
    }
});

//일정 수정
router.post('/update', async (req, res) => {
    try {
        // console.log(req.body.obj)
        const data = req.body.obj;
        const sql = "update calendar set title = ?, start = ?, end = ?, calendarDiv = ? where calendarId = ?";
        const param = [data.title, data.start, data.end, data.div, data.calendarId];
        // console.log(data.start)
        connection.query(sql, param, (err) => {
            if (err) {
                throw err;
            }
            res.send({msg: "success"});
        });

    } catch (error) {
        res.send(error.message);
    }
});

//일정 날짜만 수정
router.get('/dateUpdate', async (req, res) => {
    const start = moment(req.query.start);
    const end = moment(req.query.end);
    try {
        const sql = "update calendar set start = ?, end = ? where calendarId = ?";
        const param = [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'), req.query.calendarId];
        connection.query(sql, param, (err) => {
            if (err) {
                throw err;
            }
            res.send({msg: "success"});
        });
    } catch (error) {
        res.send(error.message);
    }
});

//일정 삭제
router.get('/delete', async (req, res) => {
    try {
        const param = req.query.calendarId;
        const sql = "delete from calendar where calendarId = ?";
        connection.query(sql, param, (err) => {
            if (err) {
                throw err;
            }
            res.send({msg: "success"});
        });

    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;