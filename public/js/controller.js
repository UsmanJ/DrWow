drWow.controller('DrCtrl', ['$scope', 'OTSession', 'apiKey', '$http', function($scope, OTSession, apiKey, $http) {
  var self = this;
  var connectionCount = 0;
  var sessionRunning = false;

  var options = {width: 400, height: 300, insertMode: 'append'}
  var publisherContainer = OT.initPublisher('publisherContainerID', options);
  var secondContainer = OT.initPublisher('secondContainerID', options);

  self.createSession = function(){
    $http({
  method: 'GET',
  url: '/createSession'
}).then(function(response) {
  var session = OT.initSession(apiKey, response.data.session.sessionId);
  console.log(session)
  session.connect( response.data.token, function(err) {
    if(err){
      alert("there is an error!");
    }else{
      session.publish(publisherContainer);
      sessionRunning = true;
      layout();
    }
  });
  self.disconnect = function() {
    session.disconnect();
  };
  session.on("streamCreated", function(event){
    session.subscribe( event.stream, secondContainer, options);
    layout();
  });
  session.on({
    connectionCreated: function (event) {
      connectionCount++;
      console.log(connectionCount + ' connections.');
    },
    connectionDestroyed: function (event) {
      connectionCount--;
      console.log(connectionCount + ' connections.');
    },
    sessionDisconnected: function sessionDisconnectHandler(event) {
      // The event is defined by the SessionDisconnectEvent class
      console.log('Disconnected from the session.');
      if (event.reason == 'networkDisconnected') {
        alert('Your network connection terminated.')
      }
    }
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
       console.log('You have connected to the session.');
       session.publish(publisherContainer);
       layout();
     }
   });
   session.on("streamCreated", function(event){
     session.subscribe( event.stream, secondContainer, options);
     layout();
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
