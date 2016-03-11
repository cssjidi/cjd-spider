var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');

var index = require('./routes/index');
var users = require('./routes/users');

var catalog = express();
// view engine setup
catalog.set('views', path.join(__dirname, 'views'));
catalog.set('view engine', 'jade');

catalog.use(logger('dev'));
catalog.use(bodyParser.json());
catalog.use(bodyParser.urlencoded({ extended: false }));
catalog.use(cookieParser());
catalog.use(sass({
    src:  path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'assets'),
    indentedSyntax: true,
    debug:true,
    sourceMap: true
}));

catalog.use(express.static(path.join(__dirname, 'assets')));

catalog.use('/', index);

catalog.use(function(req, res, next) {
    console.log(1234);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (catalog.get('env') === 'development') {
    catalog.use(function(err, req, res, next) {
        console.log(5678);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

catalog.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//catalog.use('/', index);



module.exports = catalog;