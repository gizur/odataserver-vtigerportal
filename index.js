// Use like this:
// `npm install express mysql`
// node test.js
// curl -H "username:123" -H "password: 123"  http://localhost:3000/

var util = require('util');


exports.vtiger2mysqlCredentials = function(req, res, next) {

  console.log('headers: ' + util.inspect(req.headers));

  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'homeend'
  });

  connection.connect();
  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('Setting credemntials to: ', rows[0].solution);

    req.headers.username = rows[0].solution;
    req.headers.password = rows[0].solution;

    connection.end();
    next();
  });
}
