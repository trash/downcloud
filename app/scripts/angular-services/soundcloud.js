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
}]);