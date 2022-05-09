var express = require('express');
var router = express.Router();
const models = require('../../models');
var connection = require('../../config/db').conn;

//게시글 등록 폼 이동
router.get('/', async (req, res) => {
    let route = req.app.get('views') + '/ejs/admin/weekReport_writForm.ejs';
    var page = req.query.page;
    res.render(route, {
        page: page
    });
});

//공지사항 작성
router.post('/', async (req, res, next) => {
    try {
        
        const adminId = req.session.user.id;
        var report = req.body.report;
        var nextPlan = req.body.nextPlan;
        
        report = report.toString().replaceAll(",", "</li><br><li>");
        lastReport = "<li>" + report + "</li>" ;

        nextPlan = nextPlan.toString().replaceAll(",", "</li><br><li>");
        lastNextPlan = "<li>" + nextPlan + "</li>";

        const param1 = adminId
        
        const sql1 = "select adminId from admin where adminNick = ?";
        const sql2 = "insert into weekReport (report, nextPlan, note, adminId) values(?,?,?,?)";

        connection.query(sql1, param1, (err, result) => {
            if (err) {
                throw err;
            }
            console.log(result)
            const param2 = [lastReport, lastNextPlan, req.body.note, result[0].adminId];
            connection.query(sql2, param2, (err) => {
                if (err) {
                    throw err;
                }
                res.send('<script>alert("업무일지가 등록되었습니다."); location.href="/admin/weekReport?&page=1";</script>');
            });
        });

    } catch (error) {
        res.send(error.message);
    }
});
module.exports = router;