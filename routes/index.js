var express = require('express');
var passport = require('passport');
var Account = require('../app/models/account');
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
});

router.get('/register0', function(req, res) {
    res.render('register_dr', { });
});

router.get('/register1', function(req, res) {
    res.render('register_patient', { });
});

router.get('/account', function(req, res) {
    res.render('account', { });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username, role : req.body.role, name : req.body.fullname, gender : req.body.gender, email : req.body.email, age : req.body.age, address : req.body.address, gmcRef : req.body.gmcRef }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
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
