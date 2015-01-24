'use strict';
module.exports = function ($routeProvider) {
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
	//
	// Home
	//
	.when('/home', {
		authenticate: true,
		controller: 'HomeCtrl',
		templateUrl: 'partials/home'
	})

	//
	// Login/Signup
	//
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

	//
	// Settings
	//
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
				$location.path('/u/' + User.user.get('username'));
			}]
		}
	})

	//
	// Profiles
	//
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
};