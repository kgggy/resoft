var express = require('express');
var router = express.Router();
var connection = require('../../config/db').conn;

//메인 페이지
router.get('/', async (req, res) => {
    const sql = "select * from projectAdmin;";
    connection.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        //console.log(results)
        let route = req.app.get('views') + '/ejs/admin/main.ejs';
        res.render(route, {
            sessionId: req.session.user.id,
            results : results
        });
    });
});

module.exports = router;