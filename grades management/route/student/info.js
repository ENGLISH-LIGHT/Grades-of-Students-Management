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

router.use(bodyPaser.urlencoded({}));

// 定义网站主页的路由
router.get('/', function (req, res, next) {
    res.send('student home page');
    next();
});
// 定义访问学生信息的 接口  student/info
router.get('/baseInfo', function (req, res) {
    console.log('welcome student');
    db.query("SELECT * FROM tb_stu", (err, data) => {
        if (err) {
            // console.error(11);
            res.status(500).send('database error').end();
        } else {
            res.send(data).end();
            // console.log(data);
        }
    });
});
router.get('/detailInfo', function (req, res) {
    console.log('all student infomations');
    var q = `SELECT * FROM tb_stu,tb_stuothers WHERE tb_stu.Sidenti = tb_stuothers.Sidenti AND tb_stu.Sno = 5120150001`;
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
router.use('/detailInfo/insertInfo', function (req, res) {
    console.log('update my information');
    console.log(req.body);

    // var q = `UPDATA `
});

module.exports = router;