'use strict';

angular.module('downcloudApp')

.service('alerts',[
	'$rootScope', '$timeout',
function (
	$rootScope, $timeout
) {
	var Alert = function (options) {
		this.message = options.message;
		this.class = options.class || 'alert-success';
		this.autoClose = options.autoClose || false;
	};

	this.list = [];

	this.add = function (options) {
		var alert = new Alert(options);
		this.list.push(alert);
		$rootScope.$apply();

		// Close the alert automatically in 2 seconds
		if (alert.autoClose) {
			$timeout(function () {
				this.close(alert);
			}.bind(this), 2000);
		}
	};

	this.close = function (alert) {
		var index = this.list.indexOf(alert);
		this.list.splice(index, 1);
	};
}]);