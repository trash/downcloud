'use strict';

angular.module('downcloudApp')

.directive('soundcloudLogin', ['soundcloud', function (soundcloud) {
	return {
		restrict: 'A',
		scope: {},
		link: function ($scope, $element) {

			var element = $element[0];
			element.addEventListener('click', function () {
				// soundcloud.login();
				window.location = '/auth';
			});
		}
	};
}]);