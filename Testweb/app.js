var express = require('express');
var path = require('path');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


app.listen(8888);
module.exports = app;
