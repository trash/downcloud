'use strict';

var Model = require('ampersand-model'),
	SocialLinkCollection = require('./social-link-collection');

var UserModel = Model.extend({
	idAttribute: '_id',
	props: {
		username: 'string',
		name: 'string',
		email: 'string',
		accountType: 'string',
		location: 'string',
		availability: {
			time: 'string',
			employed: 'string'
		},
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

		this.availabilityStrings = {
			employed: [
				{
					key: 'true',
					value: 'Currently employed'
				}, {
					key: 'false',
					value: 'Not currently employed',
				}, {
					key: 'null',
					value: 'Rather not say'
				}
			],
			time: [
				{
					key: 'full',
					value: 'Available full time'
				}, {
					key: 'part',
					value: 'Available part time',
				}, {
					key: 'null',
					value: 'Rather not say'
				}
			]
		};
	}
});

module.exports = UserModel;