'use strict';

const index = require('./controllers');

/**
 * Application routes
 */
module.exports = function (app) {
    // Server API Routes
    // All other routes to use Angular routing in app/scripts/app.js
    app.route('/*').get(index.index);
};
