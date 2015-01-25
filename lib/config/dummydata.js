'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Artist = mongoose.model('Artist'),
	Bounty = mongoose.model('Bounty');

/**
 * Populate database with sample application data
 */



// Clear old users, then add a default user
User.find({}).remove(function () {
	var test = User.create({
		name: 'Test User',
		email: 'test@test.com',
		username: 'test',
		soundcloudId: 666

	}, function () {
		console.log('finished populating users');
	});
});

Artist.find({}).remove(function () {
	console.log('Artists deleted.');
});


// Artwork.find({}).remove(function () {
// });

// // Clear old bounties, then add some fake ones
// Bounty.find({}).remove(function () {
// 	Bounty.create({
// 	title: 'Fake Bounty',
// 	spec: 'I dunno do something m8',
// 	poster: {
// 		name: 'lol some guy'
// 	},
// 	reward: 50,
// 	deadlineDays: 7,
// 	deadline: new Date(),
// 	revisions: 2,
// 	negotiable: true,
// 	contract: 'lol no'
// }, function () {
// 			console.log('finished populating bounties');
// 		}
// 	);
// });
