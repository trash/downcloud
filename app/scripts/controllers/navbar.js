'use strict';

angular.module('findieApp')
.controller('NavbarCtrl', [
	'$scope', '$location', 'User',
function (
	$scope, $location, User
) {

	$scope.menu = [{
		title: 'Home',
		link: '/home',
		mustBeLoggedIn: true,
		partialMatching: true
	}, {
		title: 'Browse Art',
		link: '/art'
	}, {
		title: 'Browse Bounties',
		link: '/bounties'
	}, {
		title: 'Post Bounty',
		link: '/bounties/new',
		authenticate: true,
		accountType: 'client'
	}, {
		title: 'Sell Art',
		link: '/art/sell',
		authenticate: true,
		accountType: 'artist'
	}, {
		title: 'Settings',
		link: '/settings',
		partialMatching: true,
		mustBeLoggedIn: true
	}, {
		title: 'Profile',
		link: '/profile',
		// Returns true if the current path is a match
		isMatch: function (path) {
			if (!$scope.currentUser) {
				return false;
			}
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
			(item.partialMatching && route.length > 1 && path.indexOf(route) !== -1)) {
			return true;
		}
		return false;
	};
}]);
