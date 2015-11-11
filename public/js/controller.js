drWow.controller('DrCtrl', ['$scope', 'OTSession', 'apiKey', '$http', function($scope, OTSession, apiKey, $http) {
  var self = this;
  var layoutContainer = document.getElementById("layoutContainer", options);
  var layout = initLayoutContainer(document.getElementById("layoutContainer"), {
      maxRatio: 3/2,     // The narrowest ratio that will be used (default 2x3)
      minRatio: 9/16,      // The widest ratio that will be used (default 16x9)
      fixedRatio: false,  // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      animate: false,      // Whether to use jQuery animate when positioning (default false)
      bigClass: "OT_big", // The class to add to elements that should be sized bigger
      bigPercentage: 0.8,  // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3/2,     // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9/16,     // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true        // Whether to place the big one in the top left (true) or bottom right
  }).layout;
  var connectionCount = 0;
  var sessionRunning = false;

  var options = {width: 400, height: 300, insertMode: 'append'}
  var publisherContainer = OT.initPublisher('publisherContainerID', options);

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
      alert("The call has been initialized");
      sessionRunning = true;
      layout();
    }
  });
  self.disconnect = function() {
    session.disconnect();
  };
  session.on("streamCreated", function(event){
    session.subscribe( event.stream, layoutContainer, options);
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
     session.subscribe( event.stream, layoutContainer, options);
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
