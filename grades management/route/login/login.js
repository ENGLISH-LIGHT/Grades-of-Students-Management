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
    res.send('student home page');
    // next();
});
// 定义访问学生信息的 接口  student/info
router.get('/stuLogin', function (req, res) {
    console.log('welcome student Login');
    console.log(req.query);
    var userName = req.query.email;
    var pass = req.query.password;
    var q = `SELECT * FROM tb_Suser`;
    db.query(q, (err, data) => {
        if (err) {
            // console.error(11);
            res.status(500).send('database error').end();
        } else {
            // console.log(data);

            var check = false;
            for (var i = 0; i < data.length; i++) {
                if (data[i].Suser === userName || data[i].email === userName) {
                    if (data[i].Spassword === pass) {
                        res.send('<script>alert("登录成功")</script>').end();
                        check = true;
                    } else {
                        res.send('<script>alert("密码错误")</script>').end();
                        check = true;
                    }
                }
            }
            if (check === false)
                res.send('<script>alert("用户名或邮箱不存在")</script>').end();
        }
    });

});

module.exports = router;