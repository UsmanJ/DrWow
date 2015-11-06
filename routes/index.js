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
    res.render('index', { });
});

router.get('/dr/index', function(req, res) {
    res.render('./dr/index', { user : req.user });
});

router.get('/dr/error', function(req, res) {
    res.render('./dr/error', { });
});

router.get('/dr/hello', function(req, res) {
    res.render('./dr/hello', { });
});

router.get('/dr/login', function(req, res) {
    res.render('./dr/login', { });
});

router.get('/dr/register', function(req, res) {
    res.render('./dr/register', { });
});

router.get('/patient/index', function(req, res) {
    res.render('./patient/index', { user : req.user });
});

router.get('/patient/error', function(req, res) {
    res.render('./patient/error', { });
});

router.get('/patient/hello', function(req, res) {
    res.render('./patient/hello', { });
});

router.get('/patient/login', function(req, res) {
    res.render('./patient/login', { });
});

router.get('/patient/register', function(req, res) {
    res.render('./patient/register', { });
});

router.post('/dr/register', function(req, res) {
    Doctor.register(new Doctor({ username : req.body.username }), req.body.password, function(err, doctor) {
        if (err) {
            return res.render('dr/register', { doctor : doctor });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/dr/index');
        });
    });
});

router.post('/dr/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/dr/index');
});

router.get('/dr/logout', function(req, res) {
    req.logout();
    res.redirect('/dr/index');
});

router.post('/patient/register', function(req, res) {
    Patient.register(new Patient({ username : req.body.username }), req.body.password, function(err, patient) {
        if (err) {
            return res.render('patient/register', { patient : patient });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/patient/index');
        });
    });
});

router.post('/patient/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/patient/index');
});


router.get('/patient/logout', function(req, res) {
    req.logout();
    res.redirect('/patient/index');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
