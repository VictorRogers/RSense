'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
		_ = require('lodash');

module.exports = function(app) {
	app.route('/dashboard')
		.get(users.hasAuthorization(['user', 'sentry', 'admin']), users.listSentries);
};
