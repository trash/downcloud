'use strict';

angular.module('findieApp')
.controller('SignupCtrl', [
	'$scope', 'users', '$location', 'alerts',
function (
	$scope, users, $location, alerts
) {
	$scope.user = {};
	$scope.errors = {};

	$scope.register = function (form) {
		$scope.submitted = true;

		if (form.$valid) {
			users.create({
				name: $scope.user.name,
				email: $scope.user.email,
				password: $scope.user.password,
				username: $scope.user.username
			}).then(function () {
				// Account created, redirect to home
				$location.path('/settings');
				alerts.add({
					message: 'Your account has been successfully created. Feel free to fill out the rest of your profile now.',
					class: 'alert-info'
				});
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