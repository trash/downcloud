'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	fs = require('fs'),
	path = require('path'),
	passport = require('passport'),
	multiparty = require('multiparty'),
	util = require('util'),
	_ = require('lodash');

/**
 * Create user
 */
exports.create = function (req, res, next) {
	var newUser = new User(req.body);
	newUser.provider = 'local';
	newUser.save(function(err) {
		if (err) return res.status(400).json(err);

		req.logIn(newUser, function(err) {
			if (err) return next(err);

			return res.json(req.user.userInfo);
		});
	});
};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
	var username = req.params.username;

	User.findOne({
		username: username
	}, function (err, user) {
		if (err) return next(err);
		if (!user) return res.send(404);

		// Make sure to only send userInfo so we don't send passwords lol
		res.send(user.userInfo);
	});
};

/**
 * Get the social links for a given user
 */
exports.getSocialLinks = function (req, res, next) {
	var username = req.params.username;

	User.findOne({
		username: username
	}, function (err, user) {
		if (err) return res.send(500, err);
		if (!user) return res.send(404);

		return res.json(user.socialLinks);
	});
};

exports.getProfilePicture = function (req, res, next) {
	var username = req.params.username;

	User.findOne({
		username: username
	}, function (err, user) {
		if (err) return res.send(500, err);
		if (!user || !user.profilePicture.data) {
			return res.sendFile(path.join(__dirname, '../../app/images/default-avatar.png'));
		}

		res.contentType(user.profilePicture.contentType);
		return res.send(user.profilePicture.data);
	});
};

exports.updateProfilePicture = function (req, res, next) {
	var username = req.params.username;

	User.findOne({
		username: username
	}, function (err, user) {
		if (err) return res.send(500, err);
		if (!user) return res.send(404);

		var form = new multiparty.Form();

		form.parse(req, function (err, fields, files) {
			var image = files.file;

			// Missing the picture
			if (!image || !image.length) {
				return res.send(400);
			}

			image = image[0];

			user.profilePicture.data = fs.readFileSync(image.path);
			user.profilePicture.contentType = image.headers['content-type'];

			user.save(function (err, user) {
				if (err) {
					return res.send(500, err);
				}
				return res.json(image);
			});

			// res.writeHead(200, {'content-type': 'text/plain'});
			// res.write('received upload:\n\n');
			// res.end(util.inspect({fields: fields, files: files}));
		});

		
	});
};

/**
 * Processes a post request to add a social link to the given user
 *
 * @todo This needs to authenticate the user making the request
 */
exports.addSocialLink = function (req, res, next) {
	var socialLinkData = req.body;

	var username = req.params.username;

	User.findOne({
		username: username
	}, function (err, user) {
		if (err) return res.send(500, err);
		if (!user) return res.send(404);

		user.socialLinks.push(socialLinkData);
		user.save();

		return res.json(user.socialLinks);
	});
};

/**
 * Processes a delete request to remove a social link to the given user
 *
 * @todo This needs to authenticate the user making the request
 */
exports.removeSocialLink = function (req, res, next) {
	var username = req.params.username,
		socialLinkId = req.params.socialLinkId;

	User.findOne({
		username: username
	}, function (err, user) {
		if (err) return res.send(500, err);
		if (!user) return res.send(404);

		// Check for the matching dashboard
		var socialLink = user.socialLinks.id(socialLinkId);
		if (!socialLink) return res.send(404);

		socialLink.remove();
		user.save();

		return res.json(user.socialLinks);
	});
};

/**
 * Patch user data
 */
exports.updateMe = function (req, res, next) {
	var userId = req.user._id,
		data = req.body;

	User.findById(userId, function (err, user) {
		if (err) return res.send(500, err);
		if (!user) return res.send(404);

		// Update each of the fields
		_.extend(user, data);
		user.save(function (err) {
			if (err) {
				if (err.name === 'ValidationError') {
					return res.send(400, err);
				}
				return res.send(500, err);
			}

			res.json(user.userInfo);
		});
	});
};

/**
 * Change password
 */
exports.changePassword = function (req, res, next) {
	var userId = req.user._id;
	var oldPass = String(req.body.oldPassword);
	var newPass = String(req.body.newPassword);

	User.findById(userId, function (err, user) {
		if(user.authenticate(oldPass)) {
			user.password = newPass;
			user.save(function(err) {
				if (err) return res.send(400);

				res.send(200);
			});
		} else {
			res.send(403);
		}
	});
};

/**
 * Get current user
 */
exports.me = function (req, res) {
	res.json(req.user || null);
};