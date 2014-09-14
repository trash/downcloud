'use strict';

angular.module('findieApp')
.service('Auth', ['$location', '$rootScope', 'Session', 'User', '$cookieStore',
function Auth ($location, $rootScope, Session, User, $cookieStore) {
	
	// Get currentUser from cookie
	$rootScope.currentUser = $cookieStore.get('user') || null;
	$cookieStore.remove('user');

	/**
	 * Authenticate user
	 * 
	 * @param {Object} credentials The user's login info
	 * @return {Promise}            
	 */
	this.login = function (credentials) {
		return User.login(credentials);
	};

	/**
	 * Log the user out
	 * 
	 * @return {Promise}           
	 */
	this.logout = function () {
		return User.logout();
	};

	/**
	 * Create a new user
	 * 
	 * @param {Object} user User info
	 * @param {Function} [callback] Optional callback to call after register success/fail
	 * @return {Promise}            
	 */
	this.createUser = function (user, callback) {
		callback = callback || angular.noop;

		return User.create(user).then(function (user) {
			$rootScope.currentUser = user;
			return callback(user);
		}, function (err) {
			return callback(err);
		});
	};

	/**
	 * Change password
	 * 
	 * @param {String oldPassword 
	 * @param {String} newPassword
	 * @param {Function} [callback] Callback to call after response
	 * @return {Promise}              
	 */
	this.changePassword = function (oldPassword, newPassword, callback) {
		callback = callback || angular.noop;

		return User.update({
			oldPassword: oldPassword,
			newPassword: newPassword
		}).then(function (user) {
			return callback(user);
		}, function (err) {
			return callback(err);
		});
	};

	/**
	 * Gets all available info on authenticated user
	 * 
	 * @return {Object} user
	 */
	this.currentUser = function () {
		return User.get();
	};

	/**
	 * Simple check to see if a user is logged in
	 * 
	 * @return {Boolean}
	 */
	this.isLoggedIn = function () {
		var user = $rootScope.currentUser;
		return !!user;
	};
}]);