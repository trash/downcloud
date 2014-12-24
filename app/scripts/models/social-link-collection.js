'use strict';

var Collection = require('ampersand-rest-collection'),
	SocialLinkModel = require('./social-link-model');

var SocialLinkCollection = Collection.extend({
	model: SocialLinkModel,
	// This should be replaced by the user model or manually after construction before fetch,
	url: '/api/users/<username>/social-links',
	// ajaxConfig: function () {
	// 	return {
	// 		headers: {
	// 			'Access-Token': this.accessToken
	// 		},
	// 		xhrFields: {
	// 			withCredentials: true
	// 		}
	// 	};
	// }
});

SocialLinkCollection.prototype.bootstrapUrl = function (username) {
	this.url = this.url.replace('<username>', username);
};

// var collection = new MyCollection()
// collection.fetch();

module.exports = SocialLinkCollection;