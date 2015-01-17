'use strict';

angular.module('findieApp')
.controller('SettingsCtrl', [
	'$scope', 'User', '$http',
function (
	$scope, User, $http
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

	$scope.uploadPicture = function (picture) {
		// $scope.submitted = true;

		var fd = new FormData();
		//Take the first selected file
		fd.append('picture', picture);

		console.log(picture, fd);

		$http({
			method: 'POST',
			url: $scope.actionUrl,
			data: fd,
			headers: {'Content-Type': undefined },
			transformRequest: angular.identity
		}).then(function (response) {
			console.log(response);
		});
	};
}]);
