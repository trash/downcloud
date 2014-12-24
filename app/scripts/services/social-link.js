'use strict';

var Model = require('ampersand-model');

angular.module('findieApp')

.service('SocialLink',[
function (
) {
	var SocialLink = Model.extend({
		props: {
			originalUrl: 'string',
		},
		derived: {
			url: {
				deps: ['originalUrl'],
				fn: function () {
					return this.normalizeUrl(this.originalUrl).url;
				}
			},
			network: {
				deps: ['originalUrl'],
				fn: function () {
					return this.normalizeUrl(this.originalUrl).network;
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
		}
	});

	/**
	 * Takes a url and returns the network name and the normalized url
	 * 
	 * @param {String} url The url i.e. 'play.google.com/derp'
	 * @return {Object} Normalized parts i.e. {network: 'google', url: 'http://play.google.com/derp'}
	 */
	SocialLink.prototype.normalizeUrl = function (url) {
		// Remove existing protocol if one exists
		if (url.indexOf('://') !== -1) {
			url = url.split('://')[1];
		}

		// soundcloud.com
		var networkParts = url.split('/')[0].split('.'),
			network = networkParts[networkParts.length-2];

		// Lastly add http://
		url = 'http://' + url;

		return {
			url: url,
			network: network
		};
	};

	return SocialLink;
}]);
