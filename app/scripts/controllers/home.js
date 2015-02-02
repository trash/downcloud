'use strict';

angular.module('downcloudApp')
.controller('HomeCtrl', ['$scope', '$location', 'soundcloud', function ($scope, $location, soundcloud) {
	$scope.tab = 1;

	soundcloud.getAllFollowings().then(function (followings) {
		$scope.followings = followings;

		getTracksStatus(followings);
	});

	var getTracksStatus = function (followings) {
		followings.forEach(function (following) {
			soundcloud.getTracksForArtist(following).then(function (artist) {
				following.tracks = artist.tracks.length;
			}, function () {
				following.tracks = false;
			});
		});
	};

	$scope.getTracks = function (following) {
		if (following.tracks !== false) {
			$location.path('/artists/' + following.id);
		}
		soundcloud.fetchAndStoreTracks(following).then(function (artist) {
			console.log(artist);
			following.tracks = artist.tracks.length;
		});
	};
}]);
