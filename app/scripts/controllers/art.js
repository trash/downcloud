'use strict';

angular.module('findieApp')
.controller('ArtCtrl', ['$scope', 'art', function ($scope, art) {
	$scope.art = art;
}]);