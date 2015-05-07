var express = require('express');
var app = express();

var vt2mysql = require('./index.js');

app.use(vt2mysql.vtiger2mysqlCredentials);

app.get('/', function (req, res) {

  console.log(req.headers.username, ':', req.headers.password);

  res.send('Hello World!');
  res.end();
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
