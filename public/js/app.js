var drWow = angular.module('DrWow', ['ngResource', 'opentok'])

.controller('MainCtrl', function($scope, $http) {

        $scope.submitEmail = function() {

            console.log("TEST");
        //Request
        $http.post('/email', $scope.email)
        .success(function(data, status) {
            console.log("Sent ok");
        })
        .error(function(data, status) {
            console.log("Error");
        })
    };
});
