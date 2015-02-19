'use strict';

var users = require('../../app/controllers/users.server.controller'),
		employee = require('../../app/controllers/employees.server.controller'),
		_ = require('lodash');

module.exports = function(app) {
	app.route('/employee')
		.get(users.hasAuthorization(['user', 'sentry', 'admin']), employee.list)
		.post(users.hasAuthorization(['sentry', 'admin']), employee.create);

	app.route('/employee/:employeeId')
		.get(users.hasAuthorization(['user', 'sentry', 'admin']), employee.read)
		.put(users.hasAuthorization(['sentry', 'admin']), employee.update)
		.post(users.hasAuthorization(['sentry', 'admin']), employee.create)
		.delete(users.hasAuthorization(['sentry', 'admin']), employee.delete);

	app.param('employeeId', employee.employeeByID);
};
