'use strict';

angular.module('downcloudApp')
.controller('HomeCtrl', ['$scope', 'soundcloud', function ($scope, soundcloud) {
	$scope.tab = 1;

	soundcloud.getAllFollowings().then(function (followings) {
		$scope.followings = followings;
	});
}]);
