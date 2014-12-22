'use strict';

angular.module('findieApp')

.service('users',[
	'$http', '$rootScope',
function (
	$http, $rootScope
) {
	var usersPath = '/api/users/';

	/**
	 * Gets the current user
	 *
	 * @return {Promise} Promise that resolves with the user
	 */
	this.get = function (username) {
		return $http.get(usersPath + username).then(function (response) {
			return response.data;
		});
	};
}]);
