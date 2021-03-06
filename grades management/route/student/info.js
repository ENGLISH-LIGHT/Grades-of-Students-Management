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
// 学生自己，修改自己的详细信息（QQ..）
router.use('/detailInfo/insertInfo', function (req, res) {
    console.log('update my information');
    console.log(req.body);
    var d = req.body;
    var q = `UPDATE tb_stuothers SET Stel = '${d.Stel}',SQQ = '${d.SQQ}',Swechat = '${d.Swechat}',Semail = '${d.Semail}',Saddr = '${d.Saddr}',SnativePlace = '${d.SnativePlace}',SdadName = '${d.SdadName}',SmumName = '${d.SmumName}',SdadTel = '${d.SdadTel}',SmumTel = '${d.SmumTel}',Sremarks = '${d.Sremarks}',SheadImg = '${d.SheadImg}' WHERE Sidenti = '${d.Sidenti}'`
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

//管理员修改学生的 （学生自己不能更改的信息）比如：学号：班级，年级，身份证信息
router.use('/insertInfo', function (req, res) {
    console.log('insert stu base information by admin');
    console.log(req.body);
    var d = req.body;
    var q = `INSERT INTO tb_stu VALUES ('${d.Sno}','${d.Cno}','${d.Sidenti}','${d.Ssex}','${d.Sname}',${d.Sage},${d.SGPA},${d.ShaveScore})`;
    console.log(q);
    db.query(q, (err, data) => {
        if (err) {
            // console.error(11);
            res.status(500).send('database error').end();
        } else {
            res.send('<script>alert("插入学生基本信息成功")</script>').end();
            // console.log(data);
        }
    });
});
//管理员删除
router.use('/deleteInfo',function(req,res){
    console.log('delete stu base information by admin');
    console.log(req.query);
    var d = req.query.data;
    for(var i = 0; i < d.length; i++){
        var q = 'DELETE FROM tb_stu WHERE Sno =' + d[i];
        console.log(q);
        db.query(q,(err,data)=>{
            if(err){
                console.error('delete error');
                res.status(500).send('database error').end();
            }else{
                console.log('delete success');
            }
        })
    }
});

//管理员修改
router.use('/updateInfo',function(req,res){
    console.log('update stu base information by admin');
    console.log(req.body);
    var d = req.body;
    var q = `UPDATE tb_stu SET Sno = '${d.Sno}',Cno = '${d.Cno}',Sidenti = '${d.Sidenti}',Ssex = '${d.Ssex}',Sname = '${d.Sname}', Sage = '${d.Sage}', SGPA = '${d.SGPA}', ShaveScore = '${d.ShaveScore}' WHERE Sno = '${d.Sno}'`;
    
    db.query(q,(err,data)=>{
        if(err){
            console.error('delete error');
            res.status(500).send('database error').end();
        }else{
            console.log('update success');
            res.send('<script>alert("修改学生基本信息成功")</script>').end();
        }
    })

})
module.exports = router;