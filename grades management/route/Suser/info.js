const express = require('express');
const mysql = require('mysql');
const bodyPaser = require('body-parser');
// 数据库连接池
var db = mysql.createPool(
    {
        connectionLimit: 10,
        host: 'localhost', //数据库的位置
        user: 'root',
        password: '123456',
        database: 'stu_grade_manage'
    });
//启动一个路由

var router = express.Router();

router.use(bodyPaser.urlencoded({
    extended: false,                 //扩展模式
    limit:    2*1024*1024           //限制-2M
}));

// 定义网站主页的路由
router.get('/', function (req, res, next) {
    res.send('student home page');
    // next();
});
// 定义访问用户名和密码信息的 接口 Suser/info
router.get('/info', function (req, res) {
    console.log('student user');
    db.query("SELECT * FROM tb_Suser", (err, data) => {
        if (err) {
            // console.error(11);
            res.status(500).send('database error').end();
        } else {
            res.send(data).end();
            // console.log(data);
        }
    });
});
router.get('/stu/getAccountInfo', function (req, res) {
    console.log('student user');
    console.log(req.query);
    var q = `SELECT * FROM tb_Suser WHERE ID = '${req.query.ID}'`;
    console.log(q);
    db.query(q, (err, data) => {
        console.log(data);
        if (err) {
            // console.error(11);
            res.status(500).send('database error').end();
        } else {
            res.send(data).end();
            // console.log(data);
        }
    });
});
router.use('/stu/updateAccountInfo', function (req, res) {
    console.log('update student account info');
    var d = req.body;
    console.log(d);
    var q = `UPDATE tb_suser SET tb_suser.Suser = '${d.Suser}', tb_suser.Semail = '${d.Semail}',tb_suser.STel = '${d.STel}',tb_suser.Spassword = '${d.SsecondPass}' WHERE tb_suser.ID = '${d.ID}'`;
    console.log(q);
    db.query(q, (err, data) => {
        if (err) {
            // console.error(11);
            res.status(500).send('database error').end();
        } else {
            res.send(data).end();
            // console.log(data);
        }
    });
});
// delete info
router.post('/del', function (req, res) {
    var q = 'DELETE FROM tb_teacher WHERE Tno= 0001';
    console.log(q);
    db.query(q, (err) => {
        if (err) {
            console.error('no');
            res.status(500).send('database error').end();
        } else {
            console.log('ok');
            // res.send(data).end();
            // console.log(data);
            res.redirect('/teacher/info');
        }
    });

});
module.exports = router;