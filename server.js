var express = require('express');
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
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connectionCount = 0;


var routes = require('./routes/index');


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


var Account = require('./app/models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.get('/createSession', function(req, res) {
  opentok.createSession(function(err, session) {
    if (err) return console.log(err);
      sessionObj = session
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
    // save the sessionId
    // db.save('session', session.sessionId, done);
  res.json({ hello: sessionObj, token: token });
});





var mongoose = require('mongoose');
cfg = require('./config');
db = mongoose.connect(cfg.mongo.db); // connect to our database

var User = require('./app/models/account');
var Consultation = require('./app/models/consultation');

// ROUTES FOR OUR API
// =============================================================================


app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});
