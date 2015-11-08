var express = require('express');
require('dotenv').load();
var OpenTok = require('opentok'),
    opentok = new OpenTok(process.env.apiKey,process.env.apiSecret);
var app = express();
var passport = require('passport');
var path = require('path');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var storage = require('storage');
var port = process.env.PORT || 8080;
var session = require('express-session')
var self = this;
var sessionObj = null;
// var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connectionCount = 0;


var routes = require('./routes/index');
var users = require('./routes/users');

app.set('views', path.join(__dirname + '/public/views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// set up authentication

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms



app.use(require('express-session')({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


var Patient = require('./app/models/patient');
passport.use(new LocalStrategy(Patient.authenticate()));
passport.serializeUser(Patient.serializeUser());
passport.deserializeUser(Patient.deserializeUser());

var Doctor = require('./app/models/doctor');
passport.use(new LocalStrategy(Doctor.authenticate()));
passport.serializeUser(Doctor.serializeUser());
passport.deserializeUser(Doctor.deserializeUser());

app.get('/createSession', function(req, res) {
  opentok.createSession(function(err, session) {
    if (err) return console.log(err);
      sessionObj = session
      console.log(sessionObj);
    token = session.generateToken();
    // save the sessionId
    // db.save('session', session.sessionId, done);
   res.json({ session: session, token: token });
  });
});

app.use('/', routes);

app.post('/session', function(req, res) {

});

app.get('/joinSession', function(req, res) {
  token = sessionObj.generateToken();
  console.log(sessionObj);
  console.log(token);
    // save the sessionId
    // db.save('session', session.sessionId, done);
  res.json({ hello: sessionObj, token: token });
});




var mongoose = require('mongoose');
db = mongoose.connect('mongodb://admin:123makers@ds049864.mongolab.com:49864/drwow'); // connect to our database
//modulus 'mongodb://alexlemons1:modulus@apollo.modulusmongo.net:27017/vebEb2ex'

console.log(db)
console.log(db.connection.readyState); //logs connection status to db - 0 is disconnected, 1 is connected, 2 is connecting

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//
 router.route('/consultations')

  // create a consultation (accessed at POST http://localhost:8080/api/consultations)
  .post(function(req, res) {

      var consultation = new Consultation();   // create a new instance of the Consultation model
      consultation.description = req.body.description;  // set the consultation description (comes from the request)
      consultation.patientID = req.body.patientID; //pass in id as string eg.JSON in request body = {"description":"TEST2", "patientID": "563a1a850d5fa4860f26d81c"}
      consultation.drID = req.body.drID;

      console.log(consultation);

      // save the consultation and check for errors
      consultation.save(function(err) {
          if (err)
            res.send(err);

          res.json({ message: 'Consultation created!' });
      });
  })

  // get all the consultations (accessed at GET http://localhost:8080/api/consultations)
  .get(function(req, res) {
    Consultation.find(function(err, consultations) {
        if (err)
          res.send(err);

        res.json(consultations);
    });
  });

router.route('/consultations/:consultation_id')

  // get the consultation with that id (accessed at GET http://localhost:8080/api/consultations/:consultation_id)
  .get(function(req, res) {
    Consultation.findById(req.params.consultation_id, function(err, consultation) {
      if (err)
        res.send(err);
      res.json(consultation);
    });
  })

  // update the consultation with this id (accessed at PUT http://localhost:8080/api/consultations/:consultation_id)
  .put(function(req, res) {

    // use our consultation model to find the consultation we want
    Consultation.findById(req.params.consultation_id, function(err, consultation) {
      if (err)
        res.send(err);
      consultation.description = req.body.description; //update consultation data
      consultation.patientID = req.body.patientID;
      consultation.drID = req.body.drID;

    // save the consultation
      consultation.save(function(err) {
      if (err)
         res.send(err);

      res.json({ message: 'Consultation updated!' });
      });
    });
  })

  // delete the consultation with this id (accessed at DELETE http://localhost:8080/api/consultations/:consultation_id)
  .delete(function(req, res) {

    Consultation.remove({
      _id: req.params.consultation_id
    }, function(err, consultation) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});
