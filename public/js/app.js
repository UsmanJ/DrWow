var drWow = angular.module('DrWow', ['ngResource', 'opentok'])

.controller('EmailCtrl', function($scope, $http) {


        $scope.submitEmail = function() {

        //Request
           $http({method: 'POST', url:'/email', data:{"email":$scope.email, "name":$scope.patname, "message":$scope.message, "idnum":$scope.idnum}})
           .success(function(data, status) {
            console.log("Sent ok");
        })
        .error(function(data, status) {
            console.log("Error");
        })
    };
});
