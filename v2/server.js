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
app.set('secret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev')); // log requests to console
app.use(express.static(__dirname + '/public'));


// routes ======================================================
// basic route
// app.get('/', function(req, res) {

// });


app.get('/setup', function(req, res) {
    //create a sample user
    var nick = new User({
        name: 'rob',
        password: 'password',
        admin: true
    });

    // save the sample user
    nick.save(function(err) {
        if(err) throw err;
        console.log('User saved successfully');
        res.json({ success: true });
    });
});

// API routes ==================================================
var apiRoutes = express.Router();

// api/authentication/ = authenticate a user
apiRoutes.post('/authenticate', function(req, res) {
    // find the user
    console.log(req.body.name);
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        if(err) throw err;
        if(!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check password
            if(user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // user is found and correct password
                // create a token
                var token = jwt.sign(user, app.get('secret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the token as json
                res.json({
                    success: true,
                    token: token
                });
            }
        }
    });
});

// route to verify a token
apiRoutes.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode a token
    if(token) {
        // verifies secret and checks expiration
        jwt.verify(token, app.get('secret'), function(err, decoded) {
            if(err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // save to request
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // there is no token, return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});


// api/ route
apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the api' });
});

// api/users route = return all users
apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

app.use('/api', apiRoutes);


// start server ================================================
app.listen(port);
console.log('server started at http://localhost: ' + port);
