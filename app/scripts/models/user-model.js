'use strict';
/*jshint camelcase:true*/


var Model = require('ampersand-model');

var UserModel = Model.extend({
	idAttribute: '_id',
	props: {
		soundcloudId: 'number',
		'first_name': 'string',
		'last_name': 'string',
		'full_name': 'string',
		'following_count': 'number',
		'avatar_url': 'string',
		city: 'string',
		country: 'string',
		description: 'string',
		username: 'string',
		uri: 'string',
		'permalink_url': 'string',


		paid: 'boolean',
		// username: 'string',
		// name: 'string',
		email: 'string'
	}
});

module.exports = UserModel;