var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.use('/', express.static('public'));


app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});
