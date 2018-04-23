const express = require('express');
var app = express();
app.listen(8888);

app.get('/', function (req, res) {
  res.send('Hello World!');
  res.end();
});

