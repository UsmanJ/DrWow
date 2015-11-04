drWow.controller('DrCtrl', ['$scope', 'OTSession', 'apiKey', 'sessionId', 'token', function($scope, OTSession, apiKey, sessionId, token) {
  var self = this;

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
      }
    });
    session.on("streamCreated", function(event){
      session.subscribe( event.stream );
    });
  }
}]).value({
    apiKey: '4539669',
    sessionId: 'REPLACE_WITH_YOUR_SESSION_ID',
    token: 'REPLACE_WITH_YOUR_TOKEN'
});
