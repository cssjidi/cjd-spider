var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var admin = require('./routes/index');
var catalog = require('./catalog/catalog');

var app = express();

app.use('/', catalog);
//app.use('/admin', users);

//var server = app.listen(6000,function(){
//  var host = server.address().address;
//  var port = server.address().port;
//  console.log('服务已启动'+host+port);
//})


module.exports = app;