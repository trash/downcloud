'use strict';

angular.module('downcloudApp')
.controller('HomeCtrl', ['$scope', 'soundcloud', function ($scope, soundcloud) {
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
		console.log(following);
		soundcloud.fetchAndStoreTracks(following).then(function (artist) {
			console.log(artist);
			following.tracks = artist.tracks.length;
		});
	};
}]);
