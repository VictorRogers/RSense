'use strict';

var users = require('../../app/controllers/users.server.controller'),
	contractor = require('../../app/controllers/contractor.server.controller'),
	_ = require('lodash');


module.exports = function(app) {
	app.route('/manage-contractors')
		.get(users.hasAuthorization(['admin']), contractor.list)
		.post(users.hasAuthorization(['admin']), contractor.create);

	app.route('/manage-contractors/:managedContractorId')
		.get(users.hasAuthorization(['admin']), contractor.read)
		.put(users.hasAuthorization(['admin']), contractor.update);

	app.param('managedContractorId', contractor.contractorByID);
};
