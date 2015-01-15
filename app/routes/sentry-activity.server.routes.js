'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	activity = require('../../app/controllers/sentry-activity.server.controller'),
	_ = require('lodash');

module.exports = function(app) {
	app.route('/sentry-activity')
		.get(users.hasAuthorization(['user', 'sentry', 'admin']), activity.list)
		.put(users.hasAuthorization(['sentry', 'admin']), activity.update)
		.post(users.hasAuthorization(['sentry', 'admin']), activity.create);

	app.route('/sentry-activity/:activityId')
		.get(users.hasAuthorization(['user', 'sentry', 'admin']), activity.read)
		.put(users.hasAuthorization(['sentry', 'admin']), activity.update)
		.delete(users.hasAuthorization(['sentry', 'admin']), activity.delete);

	app.param('activityId', activity.activityByID);
};
