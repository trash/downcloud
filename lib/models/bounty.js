'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Bounty Schema
 */
var BountySchema = new Schema({
	title: String,
	spec: String,
	poster: Object,
	reward: Number,
	deadlineDays: Number,
	deadline: Date,
	revisions: Number,
	negotiable: Boolean,
	contract: String
});

module.exports = mongoose.model('Bounty', BountySchema);