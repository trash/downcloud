'use strict';

angular.module('findieApp')
.controller('LoginCtrl', ['$scope', 'User', '$location', function ($scope, User, $location) {
	$scope.user = {};
	$scope.errors = {};

	$scope.login = function (form) {
		$scope.submitted = true;
		
		if (form.$valid) {
			User.login({
				email: $scope.user.email,
				password: $scope.user.password
			}).then(function () {
				// Logged in, redirect to home
				$location.path('/');
			}).catch(function (err) {
				err = err.data;
				$scope.errors.other = err.message;
			});
		}
	};
}]);