'use strict';

var Model = require('ampersand-model');

var ArtworkModel = Model.extend({
	idAttribute: '_id',
	props: {
		title: 'string',
		created: 'date',
		picture: 'string'
	}
});

module.exports = ArtworkModel;