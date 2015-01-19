'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Bounty = mongoose.model('Bounty'),
	Thing = mongoose.model('Thing');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Thing.find({}).remove(function () {
	Thing.create({
		name : 'HTML5 Boilerplate',
		info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
		awesomeness: 10
	}, {
		name : 'AngularJS',
		info : 'AngularJS is a toolset for building the framework most suited to your application development.',
		awesomeness: 10
	}, {
		name : 'Karma',
		info : 'Spectacular Test Runner for JavaScript.',
		awesomeness: 10
	}, {
		name : 'Express',
		info : 'Flexible and minimalist web application framework for node.js.',
		awesomeness: 10
	}, {
		name : 'MongoDB + Mongoose',
		info : 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
		awesomeness: 10
	}, function() {
			console.log('finished populating things');
		}
	);
});

// Clear old users, then add a default user
User.find({}).remove(function () {
	User.create({
		provider: 'local',
		name: 'Test User',
		email: 'test@test.com',
		username: 'test',
		password: 'test',
		location: 'Boston, MA',
		availability: {
			employed: 'null',
			time: 'full'
		},
		bio: 'Game developer with expertise in C# and Unity framework.',
		accountType: 'artist',
		socialLinks: []

	}, function () {
		User.create({
			provider: 'local',
			name: 'Buy Err',
			email: 'buyer@buyer.com',
			username: 'buyer',
			password: 'buyer',
			location: 'Boston, MA',
			availability: {
				employed: 'null',
				time: 'full'
			},
			bio: 'I buy dem artses',
			accountType: 'buyer',
			socialLinks: []

		}, function () {
			console.log('finished populating users');
		});
	});
});

// Clear old bounties, then add some fake ones
User.find({}).remove(function () {
	Bounty.create({
	title: 'Fake Bounty',
	spec: 'I dunno do something m8',
	poster: {
		name: 'lol some guy'
	},
	reward: 50,
	deadlineDays: 7,
	deadline: new Date(),
	revisions: 2,
	negotiable: true,
	contract: 'lol no'
}, function () {
			console.log('finished populating bounties');
		}
	);
});
