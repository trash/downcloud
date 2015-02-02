'use strict';

angular.module('downcloudApp')
.controller('ArtistCtrl', ['$scope', '$location', 'artist', function ($scope, $location, artist) {
	$scope.artist = artist;
	$scope.token = $scope.currentUser.get('accessToken');

	$scope.downloadTrack = function (track) {
		window.location = track.download_url + '?oauth_token=' + $scope.token;
	};
}]);
