const express = require('express');
const router = express.Router();
// var session = require('express-session');

const login = require('./login.js');
const main = require('./main.js');
const weekReport = require('./weekReport.js');
const weekReportInsert = require('./weekReportInsert.js');
const weekReportOne = require('./weekReportOne.js');
const weekReportUpdate = require('./weekReportUpdate.js');
const weekReportDelete = require('./weekReportDelete.js');

// router.use('/', (req,res,next) => {
//     if(req.url == '/' || req.url == '/login') {
//         // console.log("세션 검사 하지않고 로그인페이지로")
//         next();
//     } else {                                            // 로그인 페이지 이외의 페이지에 진입하려고 하는 경우
//         if(req.session.user) {
//             // console.log("세션이 있다.")
//             next();
//             // if(req.session.user.isAdmin) {
//             //     next();
//             // } else {
//             //     res.send("<script>alert('어드민 계정으로 로그인 해주세요');location.href='/admin'</script>");
//             // }                            // user와 admin이 같은 페이지를 이용할 때 구분해줘야 할 때
//         } else {
//             // console.log("세션이 없다.")
//             res.send("<script>alert('로그인이 필요합니다.');location.href='/admin'</script>");
//         }
//     }
// });

router.use('/', login);
router.use('/main', main);
router.use('/weekReport', weekReport);
router.use('/weekReportInsert', weekReportInsert);
router.use('/weekReportOne', weekReportOne);
router.use('/weekReportUpdate', weekReportUpdate);
router.use('/weekReportDelete', weekReportDelete);

module.exports = router;