const express = require('express');
const bodyPaser = require('body-parser');
const mysql = require('mysql');

function isOwnEmpty(obj) {
    for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
            return false;//返回false，不为空对象
        }
    }
    return true;//返回true，为空对象
};
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
router.get('/', function (req, res,next) {
    res.send('home page');
    // next();
});
// 定义访问老师信息/info网站主页的路由
router.get('/info', function (req, res) {
  console.log('welcome');
db.query("SELECT * FROM tb_teacher",(err, data) => {
    if (err) {
        // console.error(11);
        res.status(500).send('database error').end();
    } else {
        res.send(data).end();
        // console.log(data);
    }
});
    
});
router.use('/insertInfo',function(req,res){
    console.log('insert teacher');
    console.log(req.body);
    var obj = req.body;
    db.query('SELECT Tno FROM tb_teacher where Tno = ' + obj.Tno,(err,data)=>{
        console.log(data);
        if(err){
            res.status(500).send('database error').end();
        }else if(data.length > 0){
            res.send('数据冲突').end();
        }else{
            db.query(`INSERT INTO tb_teacher VALUES('${obj.Tno}','${obj.Tname}','${obj.Tsex}','${obj.Ttel}','${obj.Temail}','${obj.Tremarks}')`,(err,data)=>{
                if(err){
                    console.error('insert error');
                    res.status(500).send('database error').end();
                }else{
                    // res.redirect('/insertInfo')
                    console.log('insert t ok');
                    res.send('<script>alert("添加成功")</script>').end();
                }
            })
            // res.send({status:'success'}).end();
        }
    })
});
router.use('/deleteInfo',function(req,res){
    console.log('delete data');
    console.log(req.query);
    var d = req.query.data;
    for(var i = 0; i < d.length; i++){
        var q = 'DELETE FROM tb_teacher WHERE Tno =' + d[i];
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
router.use('/updateInfo',function(req,res){
    console.log('update data');
    console.log(req.body);
    var d = req.body;
    var q = `UPDATE tb_teacher SET Tno = '${d.Tno}',Tname = '${d.Tname}',Tsex = '${d.Tsex}',Ttel = '${d.Ttel}',Temail = '${d.Temail}', Tremarks = '${d.Tremarks}' WHERE Tno = '${d.Tno}'`;
    
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
// delete info
router.post('/del', function (req, res) {
  var q = 'DELETE FROM tb_teacher WHERE Tno= 0001';
  console.log(q);
    db.query(q,(err) => {
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