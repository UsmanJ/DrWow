drWow.controller('DrCtrl', ['$scope', 'OTSession', 'apiKey', '$http', function($scope, OTSession, apiKey, $http) {
  var self = this;
  var connectionCount = 0;
  var sessionRunning = false;

  var options = {width: 400, height: 300, insertMode: 'append'}

  self.createSession = function(){
    $http({
  method: 'GET',
  url: '/createSession'
}).then(function(response) {
  publisher = OT.initPublisher(publisherContainerID, options);
  publisher.on({
    streamCreated: function (event) {
      console.log("Publisher started streaming.");
      alert('The call has been initialised')
    },
    streamDestroyed: function (event) {
      console.log("Publisher stopped streaming. Reason: "
        + event.reason);
    }
  });

  session = OT.initSession(apiKey, response.data.session.sessionId);
  session.connect(response.data.token, function (error) {
    if (session.capabilities.publish == 1) {
      session.publish(publisher);
    } else {
      console.log("You cannot publish an audio-video stream.");
    }
  });
  self.disconnect = function() {
    session.disconnect();
  };
  session.on("streamCreated", function(event){
    session.subscribe( event.stream, secondContainerID, options);
    layout();
  });
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
 };

  self.joinSession = function(){
     $http({
   method: 'GET',
   url: '/joinSession'
  }).then(function(response) {
  var session = OT.initSession(apiKey, response.data.hello.sessionId);
   console.log(session);

   session.connect( response.data.token, function(err) {
     if(err){
       alert("there is an error!");
     }else{
       session.publish(publisherContainerID, options);
       alert('The call has started.')
     }
   });
   session.on("streamCreated", function(event){
     session.subscribe( event.stream, secondContainerID, options);
   });

    self.disconnect = function() {
      session.disconnect();
    };
   }, function errorCallback(response) {
     // called asynchronously if an error occurs
     // or server returns response with an error status.
   });
  };

}]).value({
    apiKey: '45396692'
});
