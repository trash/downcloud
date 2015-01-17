'use strict';

angular.module('findieApp')
.controller('SettingsPasswordCtrl', function ($scope, User, alerts) {
	$scope.errors = {};

	$scope.user = $scope.currentUser;

	$scope.changePassword = function (form) {
		$scope.submitted = true;

		if (form.$valid) {
			User.updatePassword($scope.user.oldPassword, $scope.user.newPassword).then(function () {
				alerts.add({
					message: 'Password successfully changed.',
					class: 'alert-success'
				});
			}).catch(function () {
				form.password.$setValidity('mongoose', false);
				alerts.add({
					message: 'Incorrect password',
					class: 'alert-danger'
				});
			});
		}
	};
});
