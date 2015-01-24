'use strict';

var Model = require('ampersand-model');

var ArtworkModel = Model.extend({
	idAttribute: '_id',
	url: '/api/art',
	props: {
		title: 'string',
		created: 'date',
		picture: 'string'
	}
});

module.exports = ArtworkModel;