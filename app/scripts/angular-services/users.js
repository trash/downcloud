'use strict';

angular.module('findieApp')

.service('users',[
	'$http', '$location', 'User',
function (
	$http, $location, User
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
		}, function () {
			return null;
		});
	};

	/**
	 * Sends a request to create a new user
	 *
	 * @param {Object} user The user data object
	 *
	 * @return {Promise} Promise from response
	 */
	this.create = function (user) {
		return $http.post(usersPath, user).then(function (response) {
			User.updateUser(response.data);
		}.bind(this));
	};
}]);
