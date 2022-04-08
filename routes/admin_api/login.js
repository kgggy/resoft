var express = require('express');
var router = express.Router();
var fs = require('fs');

var connection = require('../../config/db').conn;

//로그인 페이지
router.get('/', async (req, res) => {
    let route = req.app.get('views') + 'ejs/admin/index.ejs';
    res.render(route);
});

//로그인
router.post('/login', async (req, res) => {
    const { adminId, adminPw } = req.body;
    await models.admin.findOne({
        where: {
            adminId: adminId,
            adminPw: adminPw,
        }
    })
        .then(result => {
            if (result) {
                if(req.session.user) {
                    res.redirect('/admin/regist');
                } else {                                    // 세션 없는 admin일 경우 만들어줌
                    req.session.user = {
                        // isAdmin: true,           // user, admin 구분해주려고. admin 계정밖에 없으니까 필요없음.
                        id: adminId,
                    };
                    res.redirect('/admin/regist');
                }
            } else {
                return res.send('<script>alert("아이디 또는 비밀번호를 잘못 입력했습니다."); location.href = document.referrer;</script>');
            }
        })
        .catch(err => {
            res.status(500).send('error');
    })
})

//로그아웃
router.get('/logout', async (req, res) => {
    if(req.session.user){
        console.log('로그아웃');
        
        req.session.destroy(function(err){
            if(err) throw err;
            console.log('세션 삭제하고 로그아웃됨');
            res.send("<script>alert('로그아웃 되었습니다.'); location.href='/admin'</script>");
        });
    }
    else{
        console.log('로그인 상태 아님');
        res.redirect('/admin/regist');
    } 
});




module.exports = router;