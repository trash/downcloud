'use strict';

angular.module('findieApp')

.service('User',[
	'$http', '$rootScope', '$resource', '$cookieStore', 'alerts',
function (
	$http, $rootScope, $resource, $cookieStore, alerts
) {
	var usersPath = '/api/users/';
	var userSession = $resource('/api/session/');

	// Get currentUser from cookie
	$rootScope.currentUser = $cookieStore.get('user') || null;
 	$cookieStore.remove('user');

	var UserSingleton = function () {};

	/**
	 * Update the current user on the rootscope
	 *
	 * @param {Object} user User object or user data to extend onto user object
	 */
	UserSingleton.prototype.updateUser = function (user) {
		if (!$rootScope.currentUser) {
			$rootScope.currentUser = {};
		}
		angular.extend($rootScope.currentUser, user);
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
	UserSingleton.prototype.create = function (user) {
		return $http.post(usersPath, user).then(function (response) {
			this.updateUser(response.data);
		}.bind(this));
	};

	/**
	 * Send a request to add a social link to the users list of social links
	 *
	 * @param {Object} socialLink Social link data
	 */
	UserSingleton.prototype.addSocialLink = function (socialLink) {
		return $http({
			url: '/api/users/' + $rootScope.currentUser.username + '/social-links',
			method: 'POST',
			data: socialLink.toServer
		}).then(function (response) {
			// Update the user with the new social links
			this.updateUser({
				socialLinks: response.data
			});
		}.bind(this));
	};

	UserSingleton.prototype.removeSocialLink = function (socialLink) {
		var socialLinkId = socialLink._id;

		return $http({
			url: '/api/users/' + $rootScope.currentUser.username + '/social-links/' + socialLinkId,
			method: 'DELETE'
		}).then(function (response) {
			// Update the user with the new social links
			this.updateUser({
				socialLinks: response.data
			});
		}.bind(this));
	};

	/**
	 * Updates the users password
	 *
	 * @param {String} oldPassword
	 * @param {String} newPassword
	 * @return {Promise} Promise
	 */
	UserSingleton.prototype.updatePassword = function (oldPassword, newPassword) {
		return $http.patch(usersPath + 'me/password', {
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
		}).then(function (response) {
			if (response.status !== 200) {
				alerts.add({
					message: 'An error occurred.',
					class: 'alert-error'
				});
			} else {
				alerts.add({
					message: 'Profile data updated successfully.',
					autoClose: true
				});
			}
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
		return !!$rootScope.currentUser;
	};

	var userSingleton = new UserSingleton();

	return userSingleton;
}]);
