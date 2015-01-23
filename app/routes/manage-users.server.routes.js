'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
		_ = require('lodash'),
    passport = require('passport');


module.exports = function(app) {
	app.route('/manage-users')
		.get(users.hasAuthorization(['admin']), users.listUsers);

	app.route('/manage-users/:managedUserId')
		.get(users.adminRead)
		.put(users.adminUpdate);

	app.param('managedUserId', users.manageUserByID);
};
