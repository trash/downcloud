'use strict';

angular.module('findieApp')
.controller('SettingsCtrl', [
	'$scope', 'User', '$http', '$timeout',
function (
	$scope, User, $http, $timeout
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
	$scope.updateProfile = function () {
		User.update($scope.user);
	};

	$scope.uploadUrl = '/api/users/' + $scope.user.username + '/profile-picture';

	$scope.uploadSuccess = function () {
		$scope.$apply(function () {
			var oldUsername = $scope.user.username;
			$scope.user.username += 'lol';
			$timeout(function () {
				$scope.user.username = oldUsername;
			}, 250);
		});
	};
}]);
