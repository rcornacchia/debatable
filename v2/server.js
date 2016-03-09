var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'), // create, sign, verify tokens
    config = require('./config'),
    User = require('./app/models/user');

var port = process.env.PORT || 8081;
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev')); // log requests to console

// routes ======================================================
// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// app.get('/setup')

// start server ================================================
app.listen(port);
console.log('server started at http://localhost: ' + port);
