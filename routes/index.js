var express = require('express');
var passport = require('passport');
var Account = require('../app/models/account');
var Consultation = require('../app/models/consultation');
var router = express.Router();
var nodemailer = require("nodemailer");
var mandrillTransport = require('nodemailer-mandrill-transport');
var patients_array = [];
var doctors_array = [];


function isAuthenticated(req, res, next) {
//
//     // do any checks you want to in here
//
//     // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
//     // you can do this however you want with whatever variables you set up
    if (req.user.authenticated)
        return next();
//
//     // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/');
}

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

router.get('/session', function (req, res) {
    if(req.user.role === 'doctor'){
      if(doctors_array.length === 0 || doctors_array.indexOf(req.user) !== -1) { doctors_array.push(req.user) };
    }else if(req.user.role === 'patient'){
      if(patients_array.length === 0 || patients_array.indexOf(req.user) !== -1) { patients_array.push(req.user) };
    };

    if(req.user === undefined){
      res.redirect('/');
    } else if(req.user !== undefined){
      res.render('session', { params : { user : req.user, doctors_array : doctors_array, patients_array : patients_array }});
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
    // console.log("got to ping !!")
});


//--------------------------------------------------------------------------------

router.post('/consultations', function(req, res) {

    console.log(req.body.comments, req.body.prescription, req.body.date, req.body.patientID, req.body.doctorID )

    var consultation = new Consultation();   // create a new instance of the Consultation model
    consultation.comments = req.body.comments;  // set the consultation description (comes from the request)
    consultation.prescription = req.body.prescription;
    consultation.date = req.body.date;
    consultation.patientID = req.body.patientID; //pass in id as string eg.JSON in request body = {"description":"TEST2", "patientID": "563a1a850d5fa4860f26d81c"}
    consultation.doctorID = req.body.doctorID;

    console.log(consultation);

    // save the consultation and check for errors
    consultation.save(function(err) {
        if (err)
          res.send(err);

    res.redirect('/');

    });
})
//---------------------------------------------------------------

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
