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
// 定义访问用户名和密码信息的 接口 Tuser/info
router.get('/info', function (req, res) {
    console.log('Teacher user');
    db.query("SELECT * FROM tb_Tuser", (err, data) => {
        if (err) {
            // console.error(11);
            res.status(500).send('database error').end();
        } else {
            res.send(data).end();
            // console.log(data);
        }
    });

});
router.get('/teacher/getAccountInfo', function (req, res) {
    console.log('teacher user');
    console.log(req.query);
    var q = `SELECT * FROM tb_tuser WHERE ID = '${req.query.ID}'`;
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
router.use('/teacher/updateAccountInfo', function (req, res) {
    console.log('update teacher account info');
    var d = req.body;
    console.log(d);
    var q = `UPDATE tb_tuser SET tb_tuser.Tuser = '${d.Tuser}', tb_tuser.Temail = '${d.Temail}',tb_tuser.Ttel = '${d.Ttel}',tb_tuser.Tpassword = '${d.TsecondPass}' WHERE tb_tuser.ID = '${d.ID}'`;
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
module.exports = router;