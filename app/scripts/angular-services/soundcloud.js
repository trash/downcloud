'use strict';

angular.module('downcloudApp')

.service('soundcloud',[
	'$rootScope', '$q',
function (
	$rootScope, $q
) {
	this.login = function () {
		var deferred = $q.defer();

		SC.connect(function () {
			SC.get('/me', function (me) {
				$rootScope.currentUser = me;
				$rootScope.$apply();
				deferred.resolve(me);
			});
		});

		return deferred.promise;
	};
}]);