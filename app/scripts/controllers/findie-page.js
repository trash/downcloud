'use strict';

angular.module('findieApp')
.controller('FindiePageCtrl', ['$scope', 'username', function ($scope, username) {
	$scope.username = username;
}]);
