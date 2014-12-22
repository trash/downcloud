'use strict';

angular.module('findieApp')

.service('SocialLink',[
	'$http', '$rootScope',
function (
	$http, $rootScope
) {
	var SocialLink = function (url) {
		var normalized = this.normalizeUrl(url);

		this.url = normalized.url;
		this.network = normalized.network;
	};

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
