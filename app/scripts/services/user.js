'use strict';

angular.module('findieApp')
// .factory('User', function ($resource) {
// 	return $resource('/api/users/:id', {
// 		id: '@id'
// 	}, { //parameters default
// 		update: {
// 			method: 'PUT',
// 			params: {}
// 		},
// 		get: {
// 			method: 'GET',
// 			params: {
// 				id:'me'
// 			}
// 		}
// 	});
// })
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

	this.logout = function () {
		return userSession.delete(function () {
			$rootScope.currentUser = null;
		}).$promise;
	};

	this.create = function (user) {
		return $http.post(usersPath, user);
	};

	this.update = function (userData) {
		return $http.put(usersPath, userData);
	};

	this.get = function () {
		return $http.get(usersPath + 'me');
	};
}]);
