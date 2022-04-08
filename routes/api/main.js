var express = require('express');
var router = express.Router();
var fs = require('fs');

var connection = require('../../config/db').conn;

//로그인 페이지
router.get('/', async (req, res) => {
    try {
        const sql = "select * from partners";
        connection.query(sql, (err, result) => {
            if (err) {
                console.log("query error");
            }
            let route = req.app.get('views') + '/ejs/userEjs/index.ejs';
            res.render(route, {
                result : result
            });
        });
    } catch (error) {
        res.status(401).send(error.message);
    }

});




module.exports = router;