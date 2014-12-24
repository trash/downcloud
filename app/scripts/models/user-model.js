'use strict';

var Model = require('ampersand-model'),
	SocialLinkCollection = require('./social-link-collection');

var UserModel = Model.extend({
	props: {
		username: 'string',
		name: 'string',
		email: 'string',
		jobType: 'string',
		location: 'string',
		averagePastPay: 'string', // Not sure if 'string' is the right type. Maybe int with a per project/hour/whatever field?
		currentExpectedPay: 'string', // Same as above.
		availability: 'string',
		bio: 'string',
		role: {
			type: 'string',
			default: 'user'
		},
		hashedPassword: 'string',
		provider: 'string',
		salt: 'string',
		// facebook: {},
		// twitter: {},
		// github: {},
		// google: {},
	},
	collections: {
		socialLinks: SocialLinkCollection
	},
	// Fix the url for the social links which is based off the user
	initialize: function () {
		this.socialLinks.bootstrapUrl(this.username);
	}
});

module.exports = UserModel;