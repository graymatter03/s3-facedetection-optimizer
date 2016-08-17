var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer  = require('multer');
var jsend  = require('express-jsend');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(multer())

// Routes
app.use('/image', require('./routes/image'));

// error handler
app.use(function(err, req, res, next) {
    
    res.status(err.status || 500);

    console.log(err);
    console.log(err.stack);
});

module.exports = app;
