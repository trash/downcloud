'use strict';

var mongoose = require('mongoose'),
	// User = mongoose.model('User'),
	User = require('../models/user'),
	userHelpers = require('../models/user-helpers'),
	passport = require('passport'),
	SoundCloudStrategy = require('passport-soundcloud').Strategy,
	LocalStrategy = require('passport-local').Strategy;

/**
 * Passport configuration
 */
passport.serializeUser(function(user, done) {
	done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	User.findOne({
		_id: id
	}, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
		done(err, user);
	});
});

// add other strategies for more authentication flexibility
passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password' // this is the virtual field on the model
	},
	function(email, password, done) {
		User.findOne({
			email: email.toLowerCase()
		}, function(err, user) {
			if (err) return done(err);

			if (!user) {
				return done(null, false, {
					message: 'This email is not registered.'
				});
			}
			if (!user.authenticate(password)) {
				return done(null, false, {
					message: 'This password is not correct.'
				});
			}
			return done(null, user);
		});
	}
));

passport.use(new SoundCloudStrategy({
	clientID: process.env.clientId,
	clientSecret: process.env.clientSecret,
	callbackURL: "/auth/callback",
	scope: 'non-expiring'
}, function (accessToken, refreshToken, profile, done) {
	User.findOne({
		soundcloudId: profile.id
	}, function (err, user) {
		if (err || user) return done(err, user);

		// Normalize soundcloud attributes for our model
		profile = userHelpers.normalize(profile._json);
		// Add the access token to the model so we can store it
		profile.accessToken = accessToken;

		User.create(profile, function (err, user) {
			done(err, user);
		});
	});
}));

module.exports = passport;
