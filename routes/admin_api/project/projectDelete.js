var express = require('express');
var router = express.Router();
const models = require('../../../models');
var connection = require('../../../config/db').conn;
const fs = require('fs');

//첨부파일 삭제
router.get('/img', (req, res) => {
    const fileRoute = req.query.fileRoute;
    // console.log(req.body)
    // console.log(req.query)
    // console.log(fileRoute)
    try {
        const sql = "delete from file where fileRoute = ?";
        connection.query(sql, fileRoute, (err, row) => {
            if (err) {
                console.log(err)
            }
            fs.unlinkSync(fileRoute.toString(), (err) => {
                if (err) {
                    console.log(err);
                }
                return;
            });
        })
    } catch (error) {
        if (error.code == "ENOENT") {
            console.log("프로젝트 첨부파일 삭제 에러 발생");
        }
    }
    res.redirect('/admin/projectUpdate?projectId=' + req.query.projectId);
});

//클라이언트 삭제
router.get('/client', (req, res) => {
    const clientId = req.query.clientId;
    try {
        const sql = "delete from client where clientId = ?";
        connection.query(sql, clientId, (err, row) => {
            if (err) {
                console.log(err)
            }
            res.redirect('/admin/projectOne?projectId=' + req.query.projectId);
        })
    } catch (error) {
        if (error.code == "ENOENT") {
            console.log("클라이언트 삭제 에러 발생");
        }
    }
});

//히스토리 삭제
router.get('/history', (req, res) => {
    const historyId = req.query.historyId;
    try {
        const sql = "delete from history where historyId = ?";
        connection.query(sql, historyId, (err, row) => {
            if (err) {
                console.log(err)
            }
            res.redirect('/admin/projectOne?projectId=' + req.query.projectId);
        })
    } catch (error) {
        if (error.code == "ENOENT") {
            console.log("히스토리 삭제 에러 발생");
        }
    }
});

module.exports = router;