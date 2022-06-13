var express = require('express');
var router = express.Router();
const models = require('../../../models');
var connection = require('../../../config/db').conn;

//프로젝트 상세보기
router.get('/', async (req, res) => {
    var sql = "select * from projectAdmin where projectId=?";
    // console.log("adadad")
    const param = req.query.projectId;
    g_projectId = param;
    console.log(g_projectId)
    try {
        connection.query(sql, param, function (err, result) {
            if (err) {
                console.log(err);
            }
                
            let route = req.app.get('views') + '/ejs/admin/project/project_viewForm.ejs';
            console.log(result)
            res.render(route, {
                result: result
            });
        });
    } catch (error) {
        res.status(401).send(error.message);
    }
});

module.exports = router;