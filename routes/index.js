var express = require('express');
var passport = require('passport');
var Account = require('../app/models/account');
var router = express.Router();

var patients_array = [];
var doctors_array = [];


function isAuthenticated(req, res, next) {

    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user.authenticated)
        return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/');
}


router.get('/session', function (req, res) {
    if(req.user === undefined){
      res.redirect('/');
    } else if(req.user !== undefined){
      res.render('session', { params : { user : req.user, doctors_array : doctors_array, patients_array : patients_array }});
    };
    if(req.user.role === 'doctor'){
      if(doctors_array.length === 0 || doctors_array.indexOf(req.user) !== -1) { doctors_array.push(req.user) };
    }else if(req.user.role === 'patient'){
      if(patients_array.length === 0 || patients_array.indexOf(req.user) !== -1) { patients_array.push(req.user) };
    };
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.get('/', function (req, res) {
    if(req.user === undefined){
      res.render('index', { params : { user : req.user }});
    } else if(req.user !== undefined){
      res.render('index', { params : { user : req.user }});
    };
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
