'use strict';

angular.module('findieApp')
.controller('NavbarCtrl', [
	'$scope', '$location', 'User',
function (
	$scope, $location, User
) {

	$scope.menu = [{
		title: 'Home',
		link: '/'
	}, {
		title: 'Settings',
		link: '/settings',
		mustBeLoggedIn: true
	}, {
		title: 'Profile',
		link: '/profile',
		// Returns true if the current path is a match
		isMatch: function (path) {
			return path.indexOf('/u/' + $scope.currentUser.username) !== -1;
		},
		mustBeLoggedIn: true
	}];
	
	$scope.logout = function() {
		User.logout().then(function () {
			$location.path('/login');
		});
	};
	
	$scope.isActive = function (item) {
		var route = item.link,
			path = $location.path();

		// Use the isMatch function if it's defined
		if (item.isMatch) {
			return item.isMatch(path);
		}

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
