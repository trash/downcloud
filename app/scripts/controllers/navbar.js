'use strict';

angular.module('findieApp')
.controller('NavbarCtrl', ['$scope', '$location', 'User', function ($scope, $location, User) {
	$scope.menu = [{
		title: 'Home',
		link: '/'
	}, {
		title: 'Settings',
		link: '/settings',
		mustBeLoggedIn: true
	}];
	
	$scope.logout = function() {
		User.logout().then(function () {
			$location.path('/login');
		});
	};
	
	$scope.isActive = function(route) {
		return route === $location.path();
	};
}]);
