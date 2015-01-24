'use strict';

angular.module('downcloudApp')
.controller('ArtCtrl', ['$scope', 'art', function ($scope, art) {
	$scope.art = art;
}]);