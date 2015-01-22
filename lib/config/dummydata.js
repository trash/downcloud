'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Artwork = mongoose.model('Artwork'),
	Bounty = mongoose.model('Bounty');

/**
 * Populate database with sample application data
 */



// Clear old users, then add a default user
User.find({}).remove(function () {
	var test = User.create({
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
		socialLinks: [],
		art: [
		]

	}, function (err, test) {

		Artwork.create({
			title: 'Lol test art',
			created: Date.now()
		}, function (err, artwork) {
			test.art.push(artwork);
		});

		User.create({
			provider: 'local',
			name: 'Klein Ent',
			email: 'client@client.com',
			username: 'client',
			password: 'client',
			location: 'Boston, MA',
			availability: {
				employed: 'null',
				time: 'full'
			},
			bio: 'I buy dem artses',
			accountType: 'client',
			socialLinks: [],
			art: []

		}, function () {
			console.log('finished populating users');
		});
	});
});


Artwork.find({}).remove(function () {
});

// Clear old bounties, then add some fake ones
Bounty.find({}).remove(function () {
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
