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
router.get('/', function (req, res) {
    res.send('home page');
});
// 定义访问老师信息/info网站主页的路由
router.get('/info', function (req, res) {
    // ' (Sidenti,Stel,SQQ,Swechat,Semail,Saddr,SnativePlace,SdadName,SmumName,SdadTel,SmumTel,Sremarks,SheadImg)'+

    var q = 'INSERT INTO tb_stuothers' +
        ' VALUES' +
        ' (' +
        '\"111122223333444420\",\"18281680001\",\"2319513300\", \"hello girl\",\"2319513300@qq.com\",\"北京市海淀区上地10街10号\",\"四川绵阳\",\"张一人\",\"李一人\",\"15822220001\",\"15922220001\",\"积极向上,阳光可爱\",\"/img/1.png\"'
        + ')';
    // console.log(q);
    db.query(q, (err, data) => {
        if (err) {
            console.error(11);
            res.status(500).send('database error');
        } else {
            console.log(data);
        }
    });
    res.end();


});

module.exports = router;