'use strict';

var users = require('../../app/controllers/users.server.controller'),
	contractor = require('../../app/controllers/contractor.server.controller'),
	archive = require('../../app/controllers/contractor-archive.server.controller'),
	_ = require('lodash');

module.exports = function(app) {
	app.route('/contractor-archive')
		.get(users.hasAuthorization(['user', 'sentry', 'admin']), archive.list)
		.post(users.hasAuthorization(['sentry', 'admin']), archive.create);

	app.route('/contractor-archive/:contractorArchiveId')
		.get(users.hasAuthorization(['sentry', 'admin']), archive.read)
		.put(users.hasAuthorization(['sentry', 'admin']), archive.update)
		.post(users.hasAuthorization(['sentry', 'admin']), archive.create)
		.delete(users.hasAuthorization(['sentry', 'admin']), archive.delete);

	app.route('/contractor-archive-report')
		.get(users.hasAuthorization(['sentry', 'admin']), contractor.list);

	app.route('/contractor-archive-report/:contractorId')
		.get(users.hasAuthorization(['sentry', 'admin']), contractor.read)
		.put(users.hasAuthorization(['sentry', 'admin']), contractor.update)
		.post(users.hasAuthorization(['sentry', 'admin']), archive.create);

	app.param('contractorId', contractor.contractorByID);
	app.param('contractorArchiveId', archive.contractorArchiveByID);
};
