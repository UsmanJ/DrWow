drWow.controller('DrCtrl', ['$scope', 'OTSession', 'apiKey', '$http', function($scope, OTSession, apiKey, $http) {
  var self = this;

  self.joinCall = function(){

    $http({
  method: 'GET',
  url: '/session'
}).then(function(response) {
  var session = OT.initSession(apiKey, response.data.session.sessionId);
  session.connect( response.data.token, function(err) {
    if(err){
      alert("there is an error!");
    }else{
      session.publish();
      console.log(response.data.token);
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
}]).value({
    apiKey: '45396692'
});
