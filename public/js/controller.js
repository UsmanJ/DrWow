drWow.controller('DrCtrl', ['$scope', 'OTSession', 'apiKey', '$http', function($scope, OTSession, apiKey, $http) {
  var self = this;

  self.createSession = function(){
    $http({
  method: 'GET',
  url: '/createSession'
}).then(function(response) {
  var session = OT.initSession(apiKey, response.data.session.sessionId);
  session.connect( response.data.token, function(err) {
    if(err){
      alert("there is an error!");
    }else{
      session.publish();
      console.log(session);
    }
  });
  session.on("streamCreated", function(event){
    session.subscribe( event.stream );
  });
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
 };

 self.joinSession = function(){
  //  if (sessionId) {
     $http({
   method: 'GET',
   url: '/joinSession'
  }).then(function(response) {
   var session = OT.initSession(apiKey, sessionId);
   session.connect( response.data.token, function(err) {
     if(err){
       alert("there is an error!");
     }else{
       session.publish();
     }
   });
   session.on("streamCreated", function(event){
     session.subscribe( event.stream );
   });
   }, function errorCallback(response) {
     // called asynchronously if an error occurs
     // or server returns response with an error status.
   });
 // };
};


}]).value({
    apiKey: '45396692'
});
