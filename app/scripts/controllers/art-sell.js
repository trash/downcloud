'use strict';

var ArtworkModel = require('../models/artwork-model');

angular.module('findieApp')
.controller('ArtSellCtrl', ['$scope', function ($scope) {
	$scope.artwork = new ArtworkModel();

	$scope.submitArt = function () {
		$scope.artwork.save(null, {
			success: function (model, response) {
				console.log('success', model, response);
			},
			error: function (model, response) {
				console.log('error', response);
			}
		});
	};
}]);