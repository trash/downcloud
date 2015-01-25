'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Artist Schema
 */
var ArtistSchema = new Schema({
	// Soundcloud attributes
	username: String,
	soundcloudId: Number,
	uri: String,
	permalink_url: String,
	avatar_url: String,
	track_count: Number,

	// Our attributes
	lastFetched: Date,
	downloadableTrackCount: Number
});

module.exports = mongoose.model('Artist', ArtistSchema);
module.exports.schema = ArtistSchema;