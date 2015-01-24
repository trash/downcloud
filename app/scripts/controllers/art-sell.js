'use strict';

angular.module('downcloudApp')
.controller('ArtSellCtrl', ['$scope', 'alerts', 'artwork', function ($scope, alerts, artwork) {
	$scope.artwork = artwork;

	$scope.submitArt = function () {
		$scope.artwork.save(null, {
			success: function (model, response) {
				console.log('success', model, response);
				alerts.add({
					message: 'Artwork successfully created.',
					class: 'alert-success',
					autoClose: true
				});
			},
			error: function (model, response) {
				console.log(response);
				alerts.add({
					message: 'Error creating artwork.',
					class: 'alert-danger'
				});
			}
		});
	};
}]);