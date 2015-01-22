'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Artwork Schema
 */
var ArtworkSchema = new Schema({
	title: String,
	created: Date,
	picture: {
		data: Buffer,
		contentType: String
	}
});

module.exports = mongoose.model('Artwork', ArtworkSchema);
module.exports.schema = ArtworkSchema;