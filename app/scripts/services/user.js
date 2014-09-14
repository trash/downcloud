'use strict';

angular.module('findieApp')

.service('User', ['$http', '$rootScope', '$resource', function ($http, $rootScope, $resource) {
	var usersPath = '/api/users/';
	var userSession = $resource('/api/session/');

	/**
	 * Logs the user into the session service
	 *
	 * @todo Make this send a hashed password over the wire
	 * 
	 * @param {Object} credentials The user's login credentials
	 * @param {String} credentials.email The user's email
	 * @param {String} credentials.password The user's password
	 * 
	 * @return {Promise} Promise resolved on response from server
	 */
	this.login = function (credentials) {
		return userSession.save(credentials, function (user) {
			$rootScope.currentUser = user;
		}).$promise;
	};

	/**
	 * Logs the user out
	 * 
	 * @return {Promise} Promise resolved upon response from server
	 */
	this.logout = function () {
		return userSession.delete(function () {
			$rootScope.currentUser = null;
		}).$promise;
	};

	/**
	 * Sends a request to create a new user
	 * 
	 * @param {Object} user The user data object
	 * 
	 * @return {Promise} Promise from response
	 */
	this.create = function (user) {
		return $http.post(usersPath, user);
	};

	/**
	 * Sends a request to patch data on the user object
	 * Right now this is only called by the update password method
	 * 
	 * @param {Object} userData Object containing the fields on the user model to update
	 * @return {Promise} Promise from the server response
	 */
	this.update = function (userData) {
		return $http.patch(usersPath, userData);
	};

	/**
	 * Gets the current user
	 * 
	 * @return {Promise} Promise that resolves with the user
	 */
	this.get = function () {
		return $http.get(usersPath + 'me');
	};
}]);
