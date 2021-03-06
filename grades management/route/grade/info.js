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
// 成绩信息
router.get('/info', function (req, res) {
    console.log('grade info');
    db.query("SELECT * FROM tb_grade", (err, data) => {
        if (err) {
            // console.error(11);
            res.status(500).send('database error').end();
        } else {
            res.send(data).end();
            // console.log(data);
        }
    });
});
router.get('/stu/gradeInfo', function (req, res) {
    console.log('sutent grade info');
    var q = `SELECT tb_lesson.Lno,tb_lesson.Lname,tb_grade.Gscore,tb_lesson.Lscore FROM tb_lesson,tb_grade WHERE tb_grade.Sno = '5120150001' AND tb_grade.Lno = tb_lesson.Lno`;

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
// 老师上传成绩
router.use('/teacher/uploadGrades',function(req,res){
    console.log('teacher upload students grades');
    var d = req.body;
    console.log(d);
        var q = `INSERT INTO tb_grade (Sno,Lno,Gscore) VALUES ('${d.Sno}','${d.Lno}','${d.Gscore}')`;
        db.query(q,(err,data)=>{
            if (err) {
                res.status(500).send('database error').end();
            } else {
                res.send('success').end();
            }
        })
})

// 某个工号老师查看自己班上学生的成绩
router.get('/teacher/showGrades',function(req,res){
    var d = req.query;
    console.log('show student grades of teacher by id');
    console.log(d);
    var q = `SELECT tb_stu.Sno,tb_stu.Sname,tb_grade.Lno,tb_grade.Gscore FROM tb_stu,tb_grade,tb_teacher,tb_lesson WHERE tb_stu.Sno = tb_grade.Sno AND tb_lesson.Lno = tb_grade.Lno AND tb_teacher.Tno = tb_lesson.Tno AND tb_teacher.Tno = '${d.Lno}'`
    db.query(q,(err,data)=>{
        if (err) {
            res.status(500).send('database error').end();
        } else {
            res.send(data).end();
        }
    })
})
module.exports = router;