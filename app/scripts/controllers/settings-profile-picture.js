'use strict';

angular.module('findieApp')
.controller('SettingsProfilePictureCtrl', function ($scope, $http, User) {
	$scope.errors = {};

	$scope.user = $scope.currentUser;

	$scope.actionUrl = '/api/users/' + $scope.user.username + '/profile-picture';

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
});
