var express = require('express');
var passport = require('passport');
var Account = require('../app/models/account');
var router = express.Router();
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('TrfRWARNNDbLYLENx_chjQ');
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

function sendMail(emailData) {
  console.log(emailData);
  var message = {
      "html": emailData.message,
      "text": emailData.message,
      "subject": "Prescription",
      "from_email": "dr@drwow.com",
      "from_name": "Dr Wow",
      "to": [{
              "email": emailData.email,
              "name": "Recipient Name",
              "type": "to"
          }],
      "headers": {
          "Reply-To": "help@drwow.com"
      },
      "important": false,
      "track_opens": null,
      "track_clicks": null,
      "auto_text": null,
      "auto_html": null,
      "inline_css": null,
      "url_strip_qs": null,
      "preserve_recipients": null,
      "view_content_link": null,
      "bcc_address": "message.bcc_address@example.com",
      "tracking_domain": null,
      "signing_domain": null,
      "return_path_domain": null,
      "merge": true,
      "merge_language": "mailchimp",
      "global_merge_vars": [{
              "name": "name",
              "content": emailData.name
          }],
      "merge_vars": [{
              "rcpt": "recipient.email@example.com",
              "vars": [{
                      "name": "name",
                      "content": emailData.name
                  }]
          }],

  };
  var async = false;
  var ip_pool = "Main Pool";
  var send_at = "example send_at";
  mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
      console.log(result);
      /*
      [{
              "email": "recipient.email@example.com",
              "status": "sent",
              "reject_reason": "hard-bounce",
              "_id": "abc123abc123abc123abc123abc123"
          }]
      */
  }, function(e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });
};

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
      if(req.user.role === 'doctor'){
        doctors_array.length = 0;
      }else if(req.user.role === 'patient'){
        patients_array.length = 0;
      };
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
