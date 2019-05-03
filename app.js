var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var path = require('path');

var indexRouter = require('./routes/index');
var telescopeRouter = require('./routes/telescope');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/telescope', telescopeRouter);

module.exports = app;