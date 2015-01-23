'use strict';

var ArtworkCollection = require('../models/artwork-collection');

angular.module('findieApp')

.service('Art',[
	'$q',
function (
	$q
) {
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
