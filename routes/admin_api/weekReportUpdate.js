var express = require('express');
var router = express.Router();
const models = require('../../models');
var connection = require('../../config/db').conn;

//게시글 수정 폼 이동
router.get('/', async (req, res) => {
    let route = req.app.get('views') + '/ejs/admin/weekReport_udtForm.ejs';
    var page = req.query.page;
    var searchType1 = req.query.searchType1 == undefined ? "" : req.query.searchType1;
    var searchText = req.query.searchText == undefined ? "" : req.query.searchText;
    const sql = "select * from weekReport where weekReportId=?"
    const param = req.query.weekReportId;
    try{
        connection.query(sql, param, (err, result) => {
            if (err) {
                console.error(err);
            }
        res.render(route, {
            page: page,
            searchText: searchText,
            searchType1: searchType1,
            result: result
        });
        });
    } catch (error) {
        res.status(401).send(error.message);
    }
});

//주간업무일지 수정
router.post('/', async (req, res) => {
    var page = req.body.page;
    var searchType1 = req.body.searchType1 == undefined ? "" : req.body.searchType1;
    var searchText = req.body.searchText == undefined ? "" : req.body.searchText;
    const param = [req.body.report, req.body.nextPlan, req.body.note];
    var sql = "update weekReport set report=?, nextPlan=?, note=?";
    try {
        connection.query(sql, param, function (err) {
            if (err) {
                console.log(err);
            }
            res.redirect('weekReportOne?weekReportId=' + param + '&page=' + page + '&searchType1='+ searchType1 + '&searchText=' + searchText);
        });
    } catch (error) {
        res.status(401).send(error.message);
    }
});

module.exports = router;