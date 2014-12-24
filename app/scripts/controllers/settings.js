'use strict';

angular.module('findieApp')
.controller('SettingsCtrl', [
	'$scope', 'User',
function (
	$scope, User
) {
	$scope.errors = {};

	$scope.user = $scope.currentUser;
	$scope.User = User;

	/**
	 * Iterates through all the non-angularey values (starting with '$')
	 * in the form and sends a PATCH request with them to the user endpoint
	 *
	 * @param {Angular.element} form Angular form element
	 */
	$scope.updateProfile = function (form) {
		var userData = {};

		Object.keys(form).filter(function (key) {
			return key.indexOf('$') === -1;
		}).forEach(function (key) {
			userData[key] = $scope.user[key];
		});

		User.update(userData);
	};
}]);
