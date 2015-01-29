var _ = require('lodash');

var helpers = {};

/**
 * Normalize the soundcloud attributes to our mongodb ones
 *
 * @param {Object} user User data
 * @return {Object} normalized user data
 */
helpers.normalize = function (user) {
	var modifiedUser = _.extend({}, user);

	modifiedUser.soundcloudId = modifiedUser.id;
	delete modifiedUser.id;
	return modifiedUser;
};

module.exports = helpers;