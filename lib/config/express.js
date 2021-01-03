'use strict';
const config = require('./config');

/**
 * Express configuration
 */
module.exports = function (app) {
    app.set('views', config.root + '/app/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
};
