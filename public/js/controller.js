drWow.controller('DrCtrl', function() {
  var self = this;
  this.webChat = false;


  self.joinCall = function(){
    var apiKey = "45396692"
    var sessionId = "1_MX40NTM5NjY5Mn5-MTQ0NjU2ODk3MjYyNX5GWk4xSW9RSnJaTzRHeTN4NmNaOVhOQTV-UH4"
    var token = "T1==cGFydG5lcl9pZD00NTM5NjY5MiZzaWc9Y2U3MjI0ZTllMTdmNDI1YzAzZjdmZDJlNDQ0ZWZiMGYyNjI4NzY3Nzpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5UTTVOalk1TW41LU1UUTBOalUyT0RrM01qWXlOWDVHV2s0eFNXOVJTbkphVHpSSGVUTjRObU5hT1ZoT1FUVi1VSDQmY3JlYXRlX3RpbWU9MTQ0NjU2ODk5NiZub25jZT0wLjM4NDQ5NDQwMzkxMDMyODk2JmV4cGlyZV90aW1lPTE0NDcxNzM3NDAmY29ubmVjdGlvbl9kYXRhPQ=="

    var session = OT.initSession(apiKey, sessionId);
    session.connect( token, function(err) {
      if(err){
        alert("there is an error!");
      }else{
        session.publish();
        this.webChat = true;
      }
    });
    session.on("streamCreated", function(event){
      session.subscribe( event.stream );
    });
  }
//   self.joinCall = function() {
//     var OpenTok = require('opentok'),
//         opentok = new opentok.OpenTok(API_KEY, API_SECRET);
//     var sessionId;
//     opentok.createSession(null, {mediaMode:"routed"}, function(error, session) {
//       if (error) {
//         console.log("Error creating session:", error)
//       } else {
//         sessionId = session.sessionId;
//         console.log("Session ID: " + sessionId);
//       }
//     });
//
//     var token
//     opentok.createSession({}, function(error, session) {
//       if (error) {
//         console.log("Error creating session:", error)
//       } else {
//         sessionId = session.sessionId;
//         console.log("Session ID: " + sessionId);
//         //  Use the role value appropriate for the user:
//         var tokenOptions = {};
//         tokenOptions.role = "publisher";
//         tokenOptions.data = "username=bob";
//
//         // Generate a token.
//         token = opentok.generateToken(sessionId, tokenOptions);
//         console.log(token);
//       };
//   });
// };
});
