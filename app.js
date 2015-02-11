var express = require('express');
var path = require('path');
var nunjucks = require('nunjucks');
var shorturl = require('shorturl');
var mongoose = require('mongoose');
var configJS = require('./config.js');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');


var app = express();

//app.use(express.static(path.join(__dirname, 'public')));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
//mongoose.connect('mongodb://nico:nico@ds037571.mongolab.com:37571/urlshortner', function (error) {
mongoose.connect('mongodb://admin:admin@ds063879.mongolab.com:63879/urlshortnerbdd', function (error) {
    if (error) {
        console.log(error);
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});*/
app.use(function (req, res, next) {
    res.status(404).render('404.html');
});


module.exports = app;
