'use strict';

var Collection = require('ampersand-rest-collection'),
	ArtworkModel = require('./artwork-model');

var ArtworkCollection = Collection.extend({
	model: ArtworkModel,
	mainIndex: '_id',
	url: '/api/art',
});

module.exports = ArtworkCollection;