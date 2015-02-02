'use strict';
module.exports = function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'partials/main',
		controller: 'MainCtrl',
		resolve: {
			// Redirect logged in users to their home page
			redirectLoggedInUser: ['$location', 'User', function ($location, User) {
				if (User.isLoggedIn()) {
					$location.path('/home');
				}
			}]
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
	// Artist tracks page
	//
	.when('/artists/:artistId', {
		templateUrl: 'partials/artist',
		controller: 'ArtistCtrl',
		authenticate: true,
		resolve: {
			artist: ['soundcloud', '$route', function (soundcloud, $route) {
				return soundcloud.getTracksForArtist($route.current.params.artistId);
			}]
		}
	})

	//
	// Settings
	//
	.when('/settings', {
		templateUrl: 'partials/settings',
		controller: 'SettingsCtrl',
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