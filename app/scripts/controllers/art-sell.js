'use strict';

angular.module('findieApp')
.controller('ArtSellCtrl', ['$scope', function ($scope) {
	$scope.artwork = {};

	$scope.submitArt = function () {
		console.log('lol sup');
	};
}]);