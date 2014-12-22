var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SocialLinkSchema = new Schema({
	network: String,
	url: String
});

module.exports = SocialLinkSchema;