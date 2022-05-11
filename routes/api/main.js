var express = require('express');
var router = express.Router();
var fs = require('fs');

var connection = require('../../config/db').conn;

//리소프트 메인페이지
router.get('/', async (req, res) => {
    var partnersRes;
    var projectRes;
    try {
        const sql1 = "select * from partners";
        connection.query(sql1, (err, result1) => {
            if (err) {
                console.log("query error");
            }
            partnersRes = result1;
            const sql2 = "select * from project";
            connection.query(sql2, (err, result2) => {
                if (err) {
                    console.log("query error");
                }
                projectRes = result2;
                // console.log(partnersRes);
                // console.log(projectRes);
                let route = req.app.get('views') + '/ejs/userEjs/index.ejs';
                res.render(route, {
                    layout: false,
                    partnersRes : partnersRes,
                    projectRes: projectRes
                });
            });
            
        });

    } catch (error) {
        res.status(401).send(error.message);
    }

});




module.exports = router;