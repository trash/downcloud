'use strict';

angular.module('findieApp')
.factory('Session', function ($resource) {
	return $resource('/api/session/');
});
