'use strict';

var mongoose = require('mongoose'),
	Artist = mongoose.model('Artist'),
	fs = require('fs'),
	path = require('path'),
	passport = require('passport'),
	multiparty = require('multiparty'),
	util = require('util'),
	_ = require('lodash');

/**
 * Create user
 */
// exports.create = function (req, res, next) {
// 	var newUser = new User(req.body);
// 	newUser.provider = 'local';
// 	newUser.save(function(err) {
// 		if (err) return res.status(400).json(err);

// 		req.logIn(newUser, function(err) {
// 			if (err) return next(err);

// 			return res.json(req.user.userInfo);
// 		});
// 	});
// };

/**
 *  Get profile of specified user
 */
exports.get = function (req, res, next) {
	var soundcloudId = req.params.soundcloudId;

	Artist.findOne({
		soundcloudId: soundcloudId
	}, function (err, artist) {
		if (err) return next(err);
		if (!artist) return res.send(404);

		res.send(artist);
	});
};



exports.getAll = function (req, res, next) {
	Artist.find({}, function (err, artists) {
		if (err) return next(err);
		if (!artists) return res.send(404);

		res.send(artists);
	});
};

exports.create = function (req, res, next) {
	var newArtist = new Artist(req.body);

	newArtist.save(function (err) {
		if (err) return res.status(400).json(err);

		return res.status(201).end();
	});
};