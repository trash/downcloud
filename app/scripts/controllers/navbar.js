'use strict';

angular.module('findieApp')
.controller('NavbarCtrl', ['$scope', '$location', 'Auth', function ($scope, $location, Auth) {
	$scope.menu = [{
		title: 'Home',
		link: '/'
	}, {
		title: 'Settings',
		link: '/settings',
		mustBeLoggedIn: true
	}];
	
	$scope.logout = function() {
		Auth.logout()
		.then(function() {
			$location.path('/login');
		});
	};
	
	$scope.isActive = function(route) {
		return route === $location.path();
	};
}]);
