'use strict';

var api = require('./controllers/api'),
	index = require('./controllers'),
	users = require('./controllers/users'),
	bounties = require('./controllers/bounties'),
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
	app.route('/api/users/:username/profile-picture')
		.get(users.getProfilePicture)
		.post(users.updateProfilePicture);
	app.route('/api/users/:username/social-links')
		.get(users.getSocialLinks)
		.delete(users.removeSocialLink)
		.post(users.addSocialLink);
	app.route('/api/users/:username/social-links/:socialLinkId')
		.delete(users.removeSocialLink);

	app.route('/api/bounties')
		.get(bounties.getAll);

	app.route('/api/session')
		.post(session.login)
		.delete(session.logout);

	// All undefined api routes should return a 404
	app.route('/api/*')
		.get(function(req, res) {
			res.send(404);
		});

	// All other routes to use Angular routing in app/scripts/app.js
	app.route('/partials/*')
		.get(index.partials);
	app.route('/*')
		.get( middleware.setUserCookie, index.index);
};