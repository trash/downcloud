'use strict';

angular.module('findieApp')
.controller('NavbarCtrl', [
	'$scope', '$location', 'User',
function (
	$scope, $location, User
) {
	var username = $scope.currentUser ? $scope.currentUser.username : '';
	$scope.menu = [{
		title: 'Home',
		link: '/'
	}, {
		title: 'Settings',
		link: '/settings',
		mustBeLoggedIn: true
	}, {
		title: 'Profile',
		link: '/u/' + username,
		mustBeLoggedIn: true
	}];
	
	$scope.logout = function() {
		User.logout().then(function () {
			$location.path('/login');
		});
	};
	
	$scope.isActive = function (route) {
		var path = $location.path();

		if (
			// Exact match or
			route === path ||
			// It's a partial match i.e. /settings/password matches /settings (ignore '/') 
			(route.length > 1 && path.indexOf(route) !== -1)) {
			return true;
		}
		return false;
	};
}]);
