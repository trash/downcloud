'use strict';

var angularRoutes = require('./angular-routes');

angular.module('findieApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute'
])
.config([
	'$routeProvider', '$locationProvider', '$httpProvider',
function (
	$routeProvider, $locationProvider, $httpProvider
) {
	// Run the $routeProvider routes block here
	angularRoutes($routeProvider);
		
	$locationProvider.html5Mode(true);
		
	// Intercept 401s and redirect you to login
	$httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
		return {
			responseError: function (response) {
				if (response.status === 401) {
					$location.path('/login');
					return $q.reject(response);
				}
				else {
					return $q.reject(response);
				}
			}
		};
	}]);
}])
.run(['$rootScope', '$location', 'User', function ($rootScope, $location, User) {

	// Redirect to login if route requires auth and you're not logged in
	$rootScope.$on('$routeChangeStart', function (event, next) {
		
		if (next.authenticate && !User.isLoggedIn()) {
			$location.path('/login');
		}
	});
}])
.run(['$rootScope', 'alerts', function ($rootScope, alerts) {
	$rootScope.alerts = alerts;
}]);