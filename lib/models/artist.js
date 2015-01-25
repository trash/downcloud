'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TrackSchema = new Schema({
	title: String,
	description: String,
	genre: String,
	download_url: String,
	permalink_url: String,
	playback_count: Number,
	download_count: Number,
	favoritings_count: Number,
	comment_count: Number,
	duration: Number,
	soundcloudId: Number,
	created_at: String
});

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
	downloadableTrackCount: Number,
	tracks: [TrackSchema]
});

module.exports = mongoose.model('Artist', ArtistSchema);
module.exports.schema = ArtistSchema;