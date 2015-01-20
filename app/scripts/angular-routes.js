'use strict';
module.exports = ['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'partials/main',
		controller: 'MainCtrl',
		resolve: {
			// Redirect logged in users to their home page
			redirectLoggedInUser: function ($location, User) {
				if (User.isLoggedIn()) {
					$location.path('/home');
				}
			}
		}
	})
	.when('/home', {
		authenticate: true,
		resolve: {
			redirectToHome: function ($location, $rootScope) {
				if (!$rootScope.currentUser) {
					return;
				}
				$location.path('/home/' + $rootScope.currentUser.get('accountType'));
			}
		}
	})
	.when('/home/artist', {
		templateUrl: 'partials/home-artist',
		controller: 'HomeArtistCtrl',
		authenticate: true
	})
	.when('/home/client', {
		templateUrl: 'partials/home-client',
		controller: 'HomeClientCtrl',
		authenticate: true
	})
	.when('/login', {
		templateUrl: 'partials/login',
		controller: 'LoginCtrl',
		handleLoggedInUser: true
	})
	.when('/signup', {
		templateUrl: 'partials/signup',
		controller: 'SignupCtrl',
		handleLoggedInUser: true
	})
	.when('/signup/client', {
		templateUrl: 'partials/signup-client',
		controller: 'SignupCtrl',
		handleLoggedInUser: true
	})
	.when('/signup/artist', {
		templateUrl: 'partials/signup-artist',
		controller: 'SignupCtrl',
		handleLoggedInUser: true
	})
	.when('/settings', {
		templateUrl: 'partials/settings',
		controller: 'SettingsCtrl',
		authenticate: true
	})
	.when('/settings/password', {
		templateUrl: 'partials/settings-password',
		controller: 'SettingsPasswordCtrl',
		authenticate: true
	})
	.when('/profile', {
		authenticate: true,
		resolve: {
			redirect: ['$location', 'User', function ($location, User) {
				$location.path('/u/' + User.user.username);
			}]
		}
	})
	.when('/bounties', {
		templateUrl: 'partials/bounties',
		authenticate: true,
	})
	.when('/bounties/new', {
		templateUrl: 'partials/new-bounty',
		authenticate: true,
	})
	.when('/bounties/:bountyId', {
		templateUrl: 'partials/bounty',
		authenticate: true
	})
	.when('/u/:username', {
		templateUrl: 'partials/profile',
		controller: 'FindiePageCtrl',
		resolve: {
			user: ['$route', 'users', function ($route, users) {
				var username = $route.current.params.username;

				return users.get(username).then(function (user) {
					if (!user) {
						console.log('we should really be changing the rendered template to a 404');
					}
					return user;
				});
			}]
		}
	})
	.otherwise({
		templateUrl: 'partials/404'
	});
}];