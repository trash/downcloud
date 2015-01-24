'use strict';

/**
 * Custom middleware used by the application
 */
module.exports = {

	/**
	 *  Protect routes on your api from unauthenticated access
	 */
	auth: function auth(req, res, next) {
		if (req.isAuthenticated()) return next();
		res.status(401).end();
	},

	/**
	 * Set a cookie for angular so it knows we have an http session
	 */
	setUserCookie: function(req, res, next) {
		console.log('setting cookie', req.user);
		if (req.user) {
			res.cookie('user', JSON.stringify(req.user.userInfo));
		}
		next();
	}
};