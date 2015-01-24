'use strict';

var UserModel = require('../models/user-model'),
	util = require('../services/util');

angular.module('downcloudApp')

.service('User',[
	'$http', '$rootScope', '$resource', '$cookieStore', 'alerts',
function (
	$http, $rootScope, $resource, $cookieStore, alerts
) {
	var usersPath = '/api/users/';
	var userSession = $resource('/api/session/');

	var UserSingleton = function () {
		// Get currentUser from cookie
		$rootScope.currentUser = this.updateUser($cookieStore.get('user'));
	 	$cookieStore.remove('user');
	};

	/**
	 * Update the current user on the rootscope
	 *
	 * @param {Object} user User object or user data to extend onto user object
	 */
	UserSingleton.prototype.updateUser = function (user) {
		this.user = user ? new UserModel(user) : null;

		$rootScope.currentUser = this.user;

		return this.user;
	};

	UserSingleton.prototype.normalizeSoundcloudAttributes = function (user) {
		var modifiedUser = angular.extend({}, user);
		modifiedUser.soundcloudId = modifiedUser.id;
		delete modifiedUser.id;
		return modifiedUser;
	};

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
	UserSingleton.prototype.login = function (credentials) {
		return userSession.save(credentials, function (user) {
			user = this.normalizeSoundcloudAttributes(user);
			this.updateUser(user);
		}.bind(this)).$promise;
	};

	/**
	 * Logs the user out
	 *
	 * @return {Promise} Promise resolved upon response from server
	 */
	UserSingleton.prototype.logout = function () {
		return userSession.delete(function () {
			this.user = null;
			$rootScope.currentUser = null;
		}.bind(this)).$promise;
	};

	/**
	 * Send a request to add a social link to the users list of social links
	 *
	 * @param {Object} socialLink Social link data
	 */
	UserSingleton.prototype.addSocialLink = function (socialLink) {
		this.user.socialLinks.create({
			originalUrl: socialLink
		}, {
			url: this.user.socialLinks.url
		});
	};

	UserSingleton.prototype.removeSocialLink = function (socialLink) {
		socialLink.destroy({
			url: '/api/users/' + this.user.username + '/social-links/' + socialLink._id
		});
	};

	/**
	 * Updates the users password
	 *
	 * @param {String} oldPassword
	 * @param {String} newPassword
	 * @return {Promise} Promise
	 */
	UserSingleton.prototype.updatePassword = function (oldPassword, newPassword) {
		return $http({
			method: 'PATCH',
			url: usersPath + 'me/password',
			data:{
				oldPassword: oldPassword,
				newPassword: newPassword
			}
		});
	};

	/**
	 * Sends a request to patch data on the user object
	 * Right now this is only called by the update password method
	 *
	 * @param {Object} userData Object containing the fields on the user model to update
	 * @return {Promise} Promise from the server response
	 */
	UserSingleton.prototype.update = function (userData) {
		return $http({
			url: usersPath + 'me',
			method: 'PATCH',
			data: userData
		}).then(function () {
			alerts.add({
				message: 'Profile data updated successfully.',
				autoClose: true
			});
		}, function (response) {
			var error = response.data;
			alerts.add({
				message: error.message + ': ' + util.errorsToString(error.errors),
				class: 'alert-danger'
			});
		});
	};

	/**
	 * Gets the current user
	 *
	 * @return {Promise} Promise that resolves with the user
	 */
	UserSingleton.prototype.get = function () {
		return $http.get(usersPath + 'me');
	};

	/**
	 * Simple check to see if a user is logged in
	 *
	 * @return {Boolean} Whether or not the user is logged in
	 */
	UserSingleton.prototype.isLoggedIn = function () {
		return !!this.user;
	};

	var userSingleton = new UserSingleton();

	return userSingleton;
}]);
