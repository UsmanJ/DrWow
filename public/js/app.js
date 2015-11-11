var drWow = angular.module('DrWow', ['ngResource', 'opentok'])

.controller('EmailCtrl', function($scope, $http) {


        $scope.submitEmail = function() {

        //Request
           $http({method: 'POST', url:'/email', data:{"email":$scope.email}})
           .success(function(data, status) {
            console.log("Sent ok");
        })
        .error(function(data, status) {
            console.log("Error");
        })
    };
});
