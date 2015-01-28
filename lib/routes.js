'use strict';

var passport = require('passport'),
	api = require('./controllers/api'),
	index = require('./controllers'),
	users = require('./controllers/users'),
	bounties = require('./controllers/bounties'),
	art = require('./controllers/art'),
	artists = require('./controllers/artists'),
	session = require('./controllers/session'),
	middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

	// Server API Routes
	app.route('/api/awesomeThings')
		.get(api.awesomeThings);

	app.route('/api/users')
		.post(users.create);
	app.route('/api/users/me')
		.get(users.me)
		.patch(users.updateMe);
	app.route('/api/users/me/password')
		.patch(users.changePassword);
	app.route('/api/users/:username')
		.get(users.show);
	// app.route('/api/users/:username/profile-picture')
	// 	.get(users.getProfilePicture)
	// 	.post(users.updateProfilePicture);
	// app.route('/api/users/:username/social-links')
	// 	.get(users.getSocialLinks)
	// 	.delete(users.removeSocialLink)
	// 	.post(users.addSocialLink);
	// app.route('/api/users/:username/social-links/:socialLinkId')
	// 	.delete(users.removeSocialLink);

	app.route('/api/bounties')
		.get(bounties.getAll);

	app.route('/api/artists')
		.post(artists.create)
		.get(artists.getAll);
	app.route('/api/artists/:soundcloudId')
		.get(artists.get);

	app.route('/api/session')
		.post(session.login)
		.delete(session.logout);

	// All undefined api routes should return a 404
	app.route('/api/*')
		.get(function(req, res) {
			res.status(404);
		});

	app.get('/auth',
		passport.authenticate('soundcloud'));

	app.get('/auth/callback',
		passport.authenticate('soundcloud', {
			failureRedirect: '/login'
		}), function (req, res) {
			// Successful authentication, redirect home.
			res.redirect('/home');
		});

	app.route('/auth-redirect')
		.get(function (req, res) {
			res.render('callback');
		});

	// All other routes to use Angular routing in app/scripts/app.js
	app.route('/partials/*')
		.get(index.partials);
	app.route('/*')
		.get(middleware.setUserCookie, index.index);
};