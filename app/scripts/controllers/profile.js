'use strict';

angular.module('downcloudApp')
.controller('FindiePageCtrl', ['$scope', 'user', function ($scope, user) {
	$scope.user = user;
}]);