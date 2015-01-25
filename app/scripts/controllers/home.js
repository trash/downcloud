'use strict';

angular.module('downcloudApp')
.controller('HomeCtrl', ['$scope', 'soundcloud', function ($scope, soundcloud) {
	$scope.tab = 1;

	soundcloud.getAllFollowings().then(function (followings) {
		$scope.followings = followings;
	});

	$scope.getTracks = function (following) {
		console.log(following);
		soundcloud.getDownloadableTracksForUser(following.id).then(function (tracks) {
			console.log(tracks);
			$scope.tracks = tracks;
		});
	};
}]);
