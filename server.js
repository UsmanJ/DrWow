var express = require('express');
var OpenTok = require('opentok'),
    opentok = new OpenTok(process.env.apiKey,process.env.apiSecret);
var app = express();
var bodyParser = require('body-parser');
var storage = require('storage');
var port = process.env.PORT || 8080;

var OTKEY = process.env.apiKey


var sessionId;
opentok.createSession(function(err, session) {
  if (err) return console.log(err);

  // save the sessionId
  // db.save('session', session.sessionId, done);
});


app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});
