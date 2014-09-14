'use strict';

angular.module('findieApp')
.factory('Auth', ['$location', '$rootScope', 'Session', 'User', '$cookieStore',
function Auth ($location, $rootScope, Session, User, $cookieStore) {
	
	// Get currentUser from cookie
	$rootScope.currentUser = $cookieStore.get('user') || null;
	$cookieStore.remove('user');

	/**
	 * Authenticate user
	 * 
	 * @param {Object} user The user's login info
	 * @param {Function} [callback] Optional callback to call after login success/fail
	 * @return {Promise}            
	 */
	this.login = function (user, callback) {
		callback = callback || angular.noop;

		return Session.save({
			email: user.email,
			password: user.password
		}, function (user) {
			$rootScope.currentUser = user;
			return callback();
		}, function (err) {
			return callback(err);
		}).$promise;
	};

	/**
	 * Log user out
	 * 
	 * @param {Function} [callback] Optional callback to call after logout success/fail
	 * @return {Promise}           
	 */
	this.logout = function (callback) {
		callback = callback || angular.noop;

		return Session.delete(function () {
			$rootScope.currentUser = null;
			return callback();
		}, function (err) {
			return callback(err);
		}).$promise;
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

		return User.save(user,
		function (user) {
			$rootScope.currentUser = user;
			return callback(user);
		}, function (err) {
			return callback(err);
		}).$promise;
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
		}, function (user) {
			return callback(user);
		}, function (err) {
			return callback(err);
		}).$promise;
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