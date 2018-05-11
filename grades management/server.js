
const express = require('express');
const mysql = require('mysql');
const route = require('express-route');
const static = require('express-static');
var app = express();
app.listen(8082);

// app.get('/', function (req, res) {
//   res.send('Hello World!');
//   // res.end();
// });

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '123456',
//   database : 'stu_grade_manage'
// });
 
// connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

//路由
// 获取老师信息
var teacher = require('./route/teacher/info.js');
app.use('/teacher/',teacher);
// 获取学生信息
var student = require('./route/student/info.js');
app.use('/student/',student);
// 获取课程信息
var lesson = require('./route/lesson/info.js');
app.use('/lesson/',lesson);
// 获取成绩信息
var grade = require('./route/grade/info.js');
app.use('/grade/',grade);
// 获取学生用户信息
var Suser = require('./route/Suser/info.js');
app.use('/Suser/',Suser);
// 获取老师用户信息
var Tuser = require('./route/Tuser/info.js');
app.use('/Tuser/',Tuser);
// 获取学生登录信息
var login = require('./route/login/login.js');
app.use('/login/',login);
// app.use('/student/',require('./route/student')());

//5.default：static
app.use(static("./static/"));