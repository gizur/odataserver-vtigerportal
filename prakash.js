var http = require('http');
var express = require('express');
var h = require('../src/helpers.js');
var th = require('./helpers.js');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var CONFIG = require('../config.js');
var log = new h.log0(CONFIG.testLoggerOptions);
var app = express();
var odataserver = require('../src/main.js');

console.log('Time:', Date.now());

var options;
var accountId="2896d3e6bf83";
var password="PItIMdMHhsLc";

app.use(function (req, res, next) {
 options = {
 hostname: CONFIG.ODATA.HOST,
  port: CONFIG.ODATA.PORT,
  method: 'GET',
  path: '/' + accountId + '/vtiger_portalinfo',
  // path: '/delete_account',
  headers: {
  user: accountId,
  password: password
  }
  }
next();
});

app.get('/users', function (req, res, next) {
  console.log(options);
  var jsonInput='';
  th.httpRequest(options, jsonInput, function(data, statusCode) {
  console.log(data);
  });

  next();
});

app.listen(3000);
