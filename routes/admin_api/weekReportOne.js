var express = require('express');
var router = express.Router();
const models = require('../../models');
var connection = require('../../config/db').conn;

//주간업무일지 상세보기
router.get('/', async (req, res) => {
    var page = req.query.page;
    var searchType1 = req.query.searchType1 == undefined ? "" : req.query.searchType1;
    var searchText = req.query.searchText == undefined ? "" : req.query.searchText;
    var sql = "select w.*, a.adminNick, date_format(w.reportDate, '%Y-%m-%d') as reportDatefmt from weekReport w join admin a on w.adminId = a.adminId where weekReportId=?";
    const param = req.query.weekReportId;
    try {
        connection.query(sql, param, function (err, result) {

            if (err) {
                console.log(err);
            }
            let route = req.app.get('views') + '/ejs/admin/weekReport_viewForm.ejs';
            res.render(route, {
                searchType1: searchType1,
                searchText: searchText,
                result: result,
                page: page
            });
        });
    } catch (error) {
        res.status(401).send(error.message);
    }
});

module.exports = router;