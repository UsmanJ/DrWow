var drWow = angular.module('DrWow', ['ngResource', 'opentok'])

.controller('EmailCtrl', function($scope, $http) {


        $scope.submitEmail = function() {

        //Request
           $http({method: 'POST', url:'/email', data:{"email":$scope.email, "name":$scope.patname, "patientID":$scope.patientID, "doctorID":$scope.doctorID, "drName":$scope.drName, "consultation":$scope.consultation, "prescription":$scope.prescription}})
           .success(function(data, status) {
            console.log("Sent ok");
        })
        .error(function(data, status) {
            console.log("Error");
        })
    };
});
