// Use like this:
// `npm install express mysql`
// node test.js
// curl -H "username:123" -H "password: 123"  http://localhost:3000/

var util = require('util');
var CONFIG = require('./config.js');


exports.vtiger2mysqlCredentials = function(req, res, next) {

  console.log('headers: ' + util.inspect(req.headers));

  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : CONFIG.ODATA.HOST,
    user     : CONFIG.ODATA.USER,
    password : CONFIG.ODATA.PASSWORD,
    database : CONFIG.ODATA.DATABASE
  });

  connection.connect();
  var query="SELECT user_name, user_password from vtiger_portalinfo where user_name='"+req.headers.username+"' and isactive=1";
  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    console.log('Setting credemntials to: ', req.headers.username);
    if(rows.length>0)
	{
	    if(rows[0].user_name==req.headers.username && rows[0].user_password==req.headers.password)
		{
	    		req.headers.username = CONFIG.ODATA.USER;
	    		req.headers.password = CONFIG.ODATA.PASSWORD;
			 next();
		}
	    else{
			var response={};
			response.success=false;
			response.error={};
			response.error.code="ERROR";
			response.error.message="Invalid Username and Password";
			var jsonString = JSON.stringify(response);
			res.send(jsonString);
		}
 	}
     else{
			var response={};
			response.success=false;
			response.error={};
			response.error.code="ERROR";
			response.error.message="Invalid Username and Password";
			var jsonString = JSON.stringify(response);
			res.send(jsonString);
	}
    connection.end();
   console.log('Connection Closed here..');
    });
}
