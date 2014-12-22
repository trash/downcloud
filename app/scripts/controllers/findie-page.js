'use strict';

angular.module('findieApp')
.controller('FindiePageCtrl', ['$scope', 'user', function ($scope, user) {
	$scope.user = user;
}]);