'use strict';

angular.module('findieApp')
.controller('SignupCtrl', [
	'$scope', 'users', '$location', 'alerts', 'redirectHandler',
function (
	$scope, users, $location, alerts, redirectHandler
) {
	$scope.user = {};
	$scope.errors = {};

	$scope.loginUrl = '/login';
	var redirect = $location.search().redirect;
	if (redirect) {
		$scope.loginUrl += '?redirect=' + redirect;
	}


	$scope.register = function (form) {
		$scope.submitted = true;

		if (form.$valid) {
			users.create({
				name: $scope.user.name,
				email: $scope.user.email,
				password: $scope.user.password,
				username: $scope.user.username
			}).then(function () {
				alerts.add({
					message: 'Your account has been successfully created.',
					class: 'alert-info',
					autoClose: true
				});

				redirectHandler.handle();
			}).catch(function (err) {
				err = err.data;
				$scope.errors = {};

				// Update validity of form fields that match the mongoose errors
				angular.forEach(err.errors, function (error, field) {
					form[field].$setValidity('mongoose', false);
					$scope.errors[field] = error.message;
				});
			});
		}
	};
}]);