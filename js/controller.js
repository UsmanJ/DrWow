drWow.controller('DrCtrl', function() {
var self = this;

self.joinCall = function(){
  var apiKey = "45396692"
  var sessionId = "2_MX40NTM5NjY5Mn5-MTQ0NjU1NTY3OTEzNn5qSVFwWXNxMXRGcndnNUp3YmdpeDlNODZ-UH4"
  var token = "T1==cGFydG5lcl9pZD00NTM5NjY5MiZzaWc9ZTIxZWUwYTg5NTYzYTBhYjJlOWRlNjQzMDFhYWM0YjYyMzk0OThmNzpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTJfTVg0ME5UTTVOalk1TW41LU1UUTBOalUxTlRZM09URXpObjVxU1ZGd1dYTnhNWFJHY25kbk5VcDNZbWRwZURsTk9EWi1VSDQmY3JlYXRlX3RpbWU9MTQ0NjU1NTcwMiZub25jZT0wLjU4MDEyNjk0NjgwNjYyNDYmZXhwaXJlX3RpbWU9MTQ0NjU1OTI3NCZjb25uZWN0aW9uX2RhdGE9"

  var session = OT.initSession(apiKey, sessionId);
  session.connect( token, function(err) {
    if(err){
      alert("there is an error!");
    }else{
      session.publish();
    }
  });
  session.on("streamCreated", function(event){
    session.subscribe( event.stream );
  });
}

};
