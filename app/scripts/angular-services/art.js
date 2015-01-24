'use strict';

var ArtworkCollection = require('../models/artwork-collection');

angular.module('downcloudApp')

.service('Art',[
	'$q',
function (
	$q
) {
	/**
	 * Get all the art from the art end point
	 *
	 * @return {promise} Angular $q promise that resolves to the collection returned
	 */
	this.getAll = function () {
		var deferred = $q.defer(),
			art = new ArtworkCollection();

		art.fetch({
			success: function () {
				deferred.resolve(art);
			},
			error: function () {
				deferred.reject();
			}
		});

		return deferred.promise;
	};
}]);
