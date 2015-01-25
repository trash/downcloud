'use strict';

angular.module('downcloudApp')

.service('soundcloud',[
	'$rootScope', '$q', 'User',
function (
	$rootScope, $q, User
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
}]);