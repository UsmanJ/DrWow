drWow.controller('apiCtrl', function($http) {

 var self = this;

 self.getUsers = function(){
   console.log("getUsers function called")
   $http({method: 'GET', url: 'http://drwow-54498.onmodulus.net/api/users'})
   .then(function successCallback(responseData) {
     console.log(responseData)
   }, function errorCallback(response) {
     console.log("get error")
   });
 };

 self.postUser = function(nameInput){
   console.log("postUser function called")
   console.log(nameInput)

   $http({method: 'POST', url: 'http://drwow-54498.onmodulus.net/api/users', data: {"name":nameInput}})
   .then(function successCallback(response) {
     console.log("user added")
   }, function errorCallback(response) {
     console.log("post error")
   });
 };
});
