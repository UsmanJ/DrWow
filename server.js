var express = require('express');
var OpenTok = require('opentok'),
    opentok = new OpenTok(process.env.apiKey,process.env.apiSecret);
var app = express();
var bodyParser = require('body-parser');
var storage = require('storage');
var port = process.env.PORT || 8080;
var self = this;
var sessionObj = null;

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/createSession', function(req, res) {
  opentok.createSession(function(err, session) {
    if (err) return console.log(err);
      self.sessionObj = session
    token = session.generateToken();
    // save the sessionId
    // db.save('session', session.sessionId, done);
   res.json({ session: session, token: token });
  });
});

app.post('/session', function(req, res) {

});

app.get('/joinSession', function(req, res) {
  token = self.sessionObj.generateToken();
  console.log(self.sessionObj);
    // save the sessionId
    // db.save('session', session.sessionId, done);
   res.json({ sessionObj: self.sessionObj, token: token });
});

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});
