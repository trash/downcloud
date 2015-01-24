'use strict';

angular.module('findieApp')
.controller('ArtSellCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.artwork = {};

	$scope.submitArt = function (form) {
		// should really be using the ampersand model and calling save
		$http({
			url: '/api/art',
			method: 'POST',
			data: $scope.artwork
		}).then(function () {
			console.log('success', arguments);
		}, function () {
			console.log('error', arguments);
		});
	};
}]);