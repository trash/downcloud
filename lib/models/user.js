'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	SocialLinkSchema = require('./social-link');

var authTypes = ['github', 'twitter', 'facebook', 'google'];

/**
 * User Schema
 */
var UserSchema = new Schema({
	username: String,
	name: String,
	email: {
		type: String,
		lowercase: true
	},
	jobType: String,
	location: String,
	averagePastPay: String, // Not sure if string is the right type. Maybe int with a per project/hour/whatever field?
	currentExpectedPay: String, // Same as above.
	availability: {
		time: String,
		employed: String
	},
	profilePicture: {
		data: Buffer,
		contentType: String
	},
	bio: String,
	role: {
		type: String,
		default: 'user'
	},
	hashedPassword: String,
	provider: String,
	salt: String,
	facebook: {},
	twitter: {},
	github: {},
	google: {},
	socialLinks: [SocialLinkSchema]
});

/**
 * Virtuals
 */
UserSchema
	.virtual('password')
	.set(function(password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function() {
		return this._password;
	});

// Basic info to identify the current authenticated user in the app
UserSchema
	.virtual('userInfo')
	.get(function() {
		var fields = [
			'name', 'role', 'provider', 'username', 'location',
			'availability', 'bio', 'jobType', 'averagePastPay',
			'currentExpectedPay', 'email', 'socialLinks'
		];

		var userObject = {};

		// Map fields from user to object
		fields.forEach(function (field) {
			userObject[field] = this[field];
		}.bind(this));

		return userObject;
	});

// Public profile information
UserSchema
	.virtual('profile')
	.get(function() {
		return {
			'name': this.name,
			'role': this.role
		};
	});

/**
 * Validations
 */

// Validate job type
UserSchema
	.path('jobType')
	.validate(function (value) {
		// Either 'programmer', 'artist', 'composer', or ' '
		return (/programmer|artist|composer| /i).test(value);
	}, 'Invalid jobType');

// Validate empty password
UserSchema
	.path('hashedPassword')
	.validate(function (hashedPassword) {
		// if you are authenticating by any of the oauth strategies, don't validate
		if (authTypes.indexOf(this.provider) !== -1) return true;
		return hashedPassword.length;
	}, 'Password cannot be blank');

// Username validation
UserSchema
	.path('username')

	// Validate empty username
	.validate(function (username) {
		return username.length;
	}, 'Username cannot be blank')

	// Validate username is not taken
	.validate(function (value, respond) {
		console.log(value);
		var self = this;
		this.constructor.findOne({
			username: value
		}, function (err, user) {
			if(err) throw err;
			if(user) {
				if(self.id === user.id) return respond(true);
				return respond(false);
			}
			respond(true);
		});
	}, 'The specified username is already in use.');

// Email validation
UserSchema
	.path('email')

	// Validate empty email
	.validate(function (email) {
		// if you are authenticating by any of the oauth strategies, don't validate
		if (authTypes.indexOf(this.provider) !== -1) return true;
		return email.length;
	}, 'Email cannot be blank')

	// Validate email is not taken
	.validate(function (value, respond) {
		var self = this;
		this.constructor.findOne({
			email: value
		}, function (err, user) {
			if(err) throw err;
			if(user) {
				if(self.id === user.id) return respond(true);
				return respond(false);
			}
			respond(true);
		});
	}, 'The specified email address is already in use.')

	// Validate email format
	.validate(function (email) {
		console.log(email);
		var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		return emailRegex.test(email); // Assuming email has a text attribute
	}, 'The e-mail field cannot be empty.');

var validatePresenceOf = function(value) {
	return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
	.pre('save', function(next) {
		if (!this.isNew) return next();

		if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
			next(new Error('Invalid password'));
		else
			next();
	});

/**
 * Methods
 */
UserSchema.methods = {
	/**
	 * Authenticate - check if the passwords are the same
	 *
	 * @param {String} plainText
	 * @return {Boolean}
	 * @api public
	 */
	authenticate: function(plainText) {
		return this.encryptPassword(plainText) === this.hashedPassword;
	},

	/**
	 * Make salt
	 *
	 * @return {String}
	 * @api public
	 */
	makeSalt: function() {
		return crypto.randomBytes(16).toString('base64');
	},

	/**
	 * Encrypt password
	 *
	 * @param {String} password
	 * @return {String}
	 * @api public
	 */
	encryptPassword: function(password) {
		if (!password || !this.salt) return '';
		var salt = new Buffer(this.salt, 'base64');
		return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
	}
};

module.exports = mongoose.model('User', UserSchema);
