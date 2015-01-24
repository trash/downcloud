'use strict';

var passport = require('passport'),
	User = require('../models/user');

/**
 * Logout
 */
exports.logout = function (req, res) {
	req.logout();
	res.send(200);
};

var logUserIn = function (req, res, user) {
	req.logIn(user, function (err) {
		if (err) {
			return res.send(err);
		}
		res.json(req.user);
	});
};

/**
 * Login
 */
exports.login = function (req, res, next) {
	User.findOne({
		soundcloudId: req.body.soundcloudId
	}, function (err, user) {
		if (err) res.status(400).json(err);
		if (!user) {
			User.create(req.body, function (err, user) {
				if (err) res.status(400).json(err);
				logUserIn(req, res, user);
			});
		} else {
			logUserIn(req, res, user);
		}
	});

	// passport.authenticate('local', function (err, user, info) {
	// 	var error = err || info;
	// 	if (error) {
	// 		return res.status(401).json(error);
	// 	}

	// 	req.logIn(user, function (err) {
	// 		if (err) {
	// 			return res.send(err);
	// 		}
	// 		res.json(req.user.userInfo);
	// 	});
	// })(req, res, next);
};