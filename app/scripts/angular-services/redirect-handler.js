'use strict';

angular.module('findieApp')
.service('redirectHandler', ['$location', function ($location) {
	this.handle = function () {
		// Check for redirect in query param
		var redirect = $location.search().redirect;
		// If it exists, clear it from query params and follow it
		if (redirect) {
			$location.search('redirect', null);
			$location.path(redirect);
			return true;
		}

		return false;
	};
}]);