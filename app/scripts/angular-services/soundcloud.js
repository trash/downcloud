'use strict';

var moment = require('moment');

angular.module('downcloudApp')

.service('soundcloud',[
	'$rootScope', '$q', 'User', '$http',
function (
	$rootScope, $q, User, $http
) {
	this.login = function () {
		var deferred = $q.defer();

		SC.connect(function () {
			SC.get('/me', function (me) {
				console.log(me);
				// $rootScope.currentUser = me;
				// $rootScope.$apply();

				User.login(me);

				deferred.resolve(me);
			});
		});

		return deferred.promise;
	};

	this.getAllFollowings = function () {
		var deferred = $q.defer();

		var total = $rootScope.currentUser.get('followings_count'),
			followingsLoaded = [],
			currentOffset = 0,
			MAX_COUNT = 50;

			for (var i=0; i < Math.ceil(total / MAX_COUNT); i++) {
				SC.get('/me/followings', {
					offset: currentOffset
				}, function (followings) {
					followingsLoaded = followingsLoaded.concat(followings);

					console.log(followingsLoaded.length, total);
					if (followingsLoaded.length >= total) {
						deferred.resolve(followingsLoaded);
					}
				});

				currentOffset += MAX_COUNT;
			}


		return deferred.promise;
	};

	this.createNewArtist = function (artist, tracks) {
		var deferred = $q.defer();

		// Pull this out into a service method
		var modifiedArtist = angular.extend({}, artist);
		modifiedArtist.soundcloudId = artist.id;
		delete modifiedArtist.id;

		modifiedArtist.tracks = tracks;

		// They don't exist we need to create them
		$http({
			url: '/api/artists',
			method: 'POST',
			data: modifiedArtist
		}).then(function (response) {
			console.log('created a new artist');
			deferred.resolve(response.data);
		});

		return deferred.promise;
	};

	this.getTracksForArtist = function (artist, options) {
		var deferred = $q.defer();

		$http({
			url: '/api/artists/' + artist.id,
			method: 'GET'
		}).then(function (response) {
			console.log(response);
			deferred.resolve(response);
		}, function () {
			console.log('artist not found. lets get their tracks and create them');
			this.getDownloadableTracksForArtist(artist.id).then(function (tracks) {
				console.log('tracks retrieved for new artist, creating new artist', tracks);
				this.createNewArtist(artist, tracks).then(function (artist) {
					console.log('created new artist', artist);
					deferred.resolve(artist);
				});
			}.bind(this));
		}.bind(this));

		return deferred.promise;
	};

	this.getTracksForArtistFromSoundCloud = function (id, options) {
		var now = new moment(),
			deferred = $q.defer();

		options = options || {};
		var defaultOptions = {
			// 'created_at[from]': now.subtract(7, 'day').format('YYYY-MM-DD HH:MM:SS'),
			// Max length of tracks 10 minutes
			'duration[to]': 10 * 60 * 1000
		};
		options = angular.extend(defaultOptions, options);

		SC.get('/users/' + id + '/tracks', options, function (tracks) {
			deferred.resolve(tracks);
		});

		return deferred.promise;
	};

	this.getDownloadableTracksForArtist = function (artist, options) {
		var deferred = $q.defer();

		this.getTracksForArtistFromSoundCloud(artist, options).then(function (tracks) {
			deferred.resolve(tracks.filter(function (track) {
				return track.downloadable;
			}));
		});

		return deferred.promise;
	};
}]);