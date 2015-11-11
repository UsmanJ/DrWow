var express = require('express');
var passport = require('passport');
var Account = require('../app/models/account');
var router = express.Router();
var nodemailer = require("nodemailer");
var mandrillTransport = require('nodemailer-mandrill-transport');
// function isAuthenticated(req, res, next) {
//
//     // do any checks you want to in here
//
//     // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
//     // you can do this however you want with whatever variables you set up
//     if (req.user.authenticated)
//         return next();
//
//     // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
//     res.redirect('/');
// }


var transport = nodemailer.createTransport(mandrillTransport({
  auth: {
    apiKey: 'TrfRWARNNDbLYLENx_chjQ'
  }
}));

function sendMail(emailData) {
  console.log(emailData);
  transport.sendMail({
    from: 'DrWoW@DrWoW.com',
    to: emailData.email,
    subject: 'The Doctor will see you now now now',
    html: emailData.message
  }, function(err, info) {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });
};

router.get('/', function (req, res) {
    console.log(req.user)
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username, role : req.body.role }), req.body.password, function(err, account) {
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
    // console.log("got to ping !!")
});

router.get('/emailform', function(req, res){
    res.render('emailform', { user : req.user });
});

router.post('/email',function(req,res){
  // console.log(req.body.email);
  var emailTosend = req.body.email
  var emailData = req.body
  console.log(emailData);
  sendMail(emailData);
  //  console.log("are we done here?");
  // transport.close();
  res.redirect('/ping')
  // server.
});





module.exports = router;
