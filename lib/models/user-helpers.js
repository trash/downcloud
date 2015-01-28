var _ = require('lodash');

var normalize = function (user) {
	var modifiedUser = _.extend({}, user);

	modifiedUser.soundcloudId = modifiedUser.id;
	delete modifiedUser.id;
	return modifiedUser;
};

module.exports = {
	normalize: normalize
};