'use strict';

angular.module('downcloudApp')
.controller('LoginCtrl', [
	'$scope', 'User', '$location', 'redirectHandler',
function (
	$scope, User, $location, redirectHandler
) {
	$scope.user = {};
	$scope.errors = {};

	$scope.login = function (form) {
		$scope.submitted = true;
		
		if (form.$valid) {
			User.login({
				email: $scope.user.email,
				password: $scope.user.password
			}).then(function () {
				var redirected = redirectHandler.handle();

				if (!redirected) {
					// Logged in, redirect to home
					$location.path('/');
				}
			}).catch(function (err) {
				err = err.data;
				$scope.errors.other = err.message;
			});
		}
	};
}]);