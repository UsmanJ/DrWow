var express = require('express');
var passport = require('passport');
var Doctor = require('../app/models/doctor');
var Patient = require('../app/models/patient');
var router = express.Router();

function isAuthenticated(req, res, next) {

    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user.authenticated)
        return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/');
}

router.get('/', function (req, res) {
    console.log(req.user)
    res.render('index', { user : req.user });
    console.log(req.user.role)
});

router.get('/patient/hello', function(req, res) {
    res.render('./patient/hello', { });
});


router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username, role : req.body.role }), req.body.password, function(err, account) {
        if (err) {
            return res.render('/register', { doctor : doctor });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
