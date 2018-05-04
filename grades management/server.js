
const express = require('express');
const mysql = require('mysql');
const route = require('express-route')
var app = express();
app.listen(8888);

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
var teacher = require('./route/teacher/info.js');
app.use('/teacher/',teacher);
// app.use('/student/',require('./route/student')());