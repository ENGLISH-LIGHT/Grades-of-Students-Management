const express = require('express');
const mysql = require('mysql');

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

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// 定义网站主页的路由
router.get('/', function (req, res, next) {
    res.send('lesson page');
    // next();
});
// 课程信息
router.get('/info', function (req, res) {
    console.log('lesson info');
    db.query("SELECT * FROM tb_lesson", (err, data) => {
        if (err) {
            // console.error(11);
            res.status(500).send('database error').end();
        } else {
            res.send(data).end();
            // console.log(data);
        }
    });

});
// 课程信息-某个同学的课程信息
router.get('/stu/lessonInfo', function (req, res) {
    console.log('lesson info');
    var q = `SELECT DISTINCT tb_lesson.Lno,tb_lesson.Lname,tb_teacher.Tname,tb_lesson.Lroom,tb_lesson.Lscore FROM tb_teacher,tb_lesson,tb_grade WHERE tb_grade.Sno = '5120150001' AND tb_grade.Lno = tb_grade.Lno AND tb_teacher.Tno = tb_lesson.Tno`;
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