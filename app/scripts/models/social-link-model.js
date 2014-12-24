'use strict';

var Model = require('ampersand-model');

var SocialLinkModel = Model.extend({
	props: {
		originalUrl: 'string',
		_id: 'string'
	},
	derived: {
		url: {
			deps: ['originalUrl'],
			fn: function () {
				var url = this.originalUrl;
				// Remove existing protocol if one exists
				if (url.indexOf('://') !== -1) {
					url = url.split('://')[1];
				}
				// Lastly add 'http://'
				return 'http://' + url;
			}
		},
		network: {
			deps: ['url'],
			fn: function () {
				var url = this.url;
				// Hacky af
				// http://play.google.com/derp -> google
				var networkParts = url.split('http://')[1].split('/')[0].split('.');
				return networkParts[networkParts.length-2];
			}
		},
		toServer: {
			deps: ['url', 'network'],
			fn: function () {
				return {
					url: this.url,
					network: this.network
				};
			}
		}
	},
	initialize: function (data) {
		if (data && data.url) {
			this.originalUrl = data.url;
		}
	}
});

module.exports = SocialLinkModel;