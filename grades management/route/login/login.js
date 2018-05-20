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
                        // res.send('<script>window.location.href="../stuHomePage.html"</script>').end();
                        res.redirect("../stuHomePage.html").end();
                        check = true;
                    } else {
                        console.log("stu login success");
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
router.get('/teacherLogin', function (req, res) {
    console.log('welcome teacher Login');
    console.log(req.query);
    var userName = req.query.email;
    var pass = req.query.password;
    var q = `SELECT * FROM tb_tuser`;
    db.query(q, (err, data) => {
        if (err) {
            // console.error(11);
            res.status(500).send('database error').end();
        } else {
            // console.log(data);

            var check = false;
            for (var i = 0; i < data.length; i++) {
                if (data[i].Tuser === userName || data[i].Temail === userName) {
                    if (data[i].Tpassword === pass) {
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
// insert 
router.use('/teacherAccountInsert', function (req, res) {
    console.log('insert teacher acount by admin');
    console.log(req.body);
    var d = req.body;
    db.query(`SELECT ID FROM tb_Tuser`, (err, data) => {
        if (err) {
            // console.error(11);
            res.status(500).send('database error').end();
        } else {
            var ID = data[data.length-1].ID + 1;
            var q = `INSERT INTO tb_tuser VALUES (${ID},'${d.Tuser}','${d.Tpassword}','${d.Temail}','${d.Ttel}')`;
            db.query(q, (err, data) => {
                if (err) {
                    // console.error(11);
                    res.status(500).send('database error').end();
                } else {
                    res.send('<script>alert("插入老师用户成功")</script>').end();
                }
            });
        }
    });
    
});
// delete 
router.get('/teacherAccountDelete',function(req,res){
    console.log('delete teacher acount by admin');
    console.log(req.query);
    var d = req.query.data;
    for(var i = 0; i < d.length; i++){
        var q = 'DELETE FROM tb_tuser WHERE ID =' + d[i];
        console.log(q);
        db.query(q,(err,data)=>{
            if(err){
                console.error('delete error');
                res.status(500).send('database error').end();
            }else{
                console.log('delete teacher account success');
            }
        })
    }
});
router.use('/teacherAccountUpdate',function(req,res){
    console.log('delete teacher acount by admin');
    console.log(req.body);
    var d = req.body;
    var q = `UPDATE tb_tuser SET Tuser = '${d.Tuser}',Tpassword = '${d.Tpassword}',Temail = '${d.Temail}',Ttel = '${d.Ttel}' WHERE ID = '${d.ID}'`;
    
    db.query(q,(err,data)=>{
        if(err){
            console.error('delete error');
            res.status(500).send('database error').end();
        }else{
            console.log('update success');
            res.send('<script>alert("修改成功")</script>').end();
        }
    })

})
// insert 
router.use('/studentAccountInsert', function (req, res) {
    console.log('insert student acount by admin');
    console.log(req.body);
    var d = req.body;
    db.query(`SELECT ID FROM tb_Suser`, (err, data) => {
        if (err) {
            // console.error(11);
            res.status(500).send('database error').end();
        } else {
           var ID = data[data.length-1].ID + 1;
            var q = `INSERT INTO tb_suser VALUES (${ID},'${d.Suser}','${d.Spassword}','${d.Semail}','${d.STel}')`;
            console.log(q);
            db.query(q, (err, data) => {
                if (err) {
                    // console.error(11);
                    res.status(500).send('database error').end();
                } else {
                    res.send('<script>alert("插入学生用户成功")</script>').end();
                }
            });
        }
    });
    
});
// delete 
router.get('/studentAccountDelete',function(req,res){
    console.log('delete student acount by admin');
    console.log(req.query);
    var d = req.query.data;
    for(var i = 0; i < d.length; i++){
        var q = 'DELETE FROM tb_suser WHERE ID =' + d[i];
        console.log(q);
        db.query(q,(err,data)=>{
            if(err){
                console.error('delete error');
                res.status(500).send('database error').end();
            }else{
                console.log('delete teacher account success');
            }
        })
    }
});
router.use('/studentAccountUpdate',function(req,res){
    console.log('delete student acount by admin');
    console.log(req.body);
    var d = req.body;
    var q = `UPDATE tb_suser SET Suser = '${d.Suser}',Spassword = '${d.Spassword}',Semail = '${d.Semail}',STel = '${d.STel}' WHERE ID = '${d.ID}'`;
    console.log(q);
    db.query(q,(err,data)=>{
        if(err){
            console.error('update error');
            res.status(500).send('database error').end();
        }else{
            console.log('update success');
            res.send('<script>alert("修改成功")</script>').end();
        }
    })

})
module.exports = router;