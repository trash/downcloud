'use strict';
module.exports = function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'partials/main',
		controller: 'MainCtrl'
	})
	.when('/login', {
		templateUrl: 'partials/login',
		controller: 'LoginCtrl'
	})
	.when('/signup', {
		templateUrl: 'partials/signup',
		controller: 'SignupCtrl'
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
	.when('/u/:username', {
		templateUrl: 'partials/findie-page',
		controller: 'FindiePageCtrl',
		resolve: {
			user: ['$route', 'users', function ($route, users) {
				var username = $route.current.params.username;

				return users.get(username);
			}]
		}
	})
	.otherwise({
		redirectTo: '/'
	});
};