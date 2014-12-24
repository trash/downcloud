'use strict';

angular.module('findieApp')
.controller('SettingsPasswordCtrl', function ($scope, User) {
	$scope.errors = {};

	$scope.user = $scope.currentUser;

	$scope.changePassword = function (form) {
		$scope.submitted = true;

		if (form.$valid) {
			User.updatePassword($scope.user.oldPassword, $scope.user.newPassword).then(function () {
				$scope.message = 'Password successfully changed.';
			}).catch(function () {
				form.password.$setValidity('mongoose', false);
				$scope.errors.other = 'Incorrect password';
			});
		}
	};
});
