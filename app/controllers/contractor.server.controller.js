'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
		errorHandler = require('./errors.server.controller'),
		Contractor = mongoose.model('Contractor'),
    _ = require('lodash');

/**
 * Create a Contractor
 */
exports.create = function(req, res) {
	var contractor = new Contractor(req.body);
	
	contractor.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('contractor.created', contractor);
			res.json(contractor);
		}
	});
};

/**
 * Show the current Contractor
 */
exports.read = function(req, res) {
	res.json(req.contractor);
};

/**
 * Update a Contractor
 */
exports.update = function(req, res) {
	var contractor = req.contractor;

	contractor = _.extend(contractor, req.body);

	contractor.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('contractor.updated', contractor);
			res.json(contractor);
		}
	});
};

/**
 * Delete an Contractor
 */
exports.delete = function(req, res) {
	var contractor = req.contractor;

	contractor.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message:errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('contractor.deleted', contractor);
			res.json(contractor);
		}
	});
};

/**
 * List of Contractors
 */
exports.list = function(req, res) {
	Contractor.find().sort('-contractorName')
	.exec(function(err, contractor) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(contractor);
		}
	});
};


exports.contractorByID = function(req, res, next, id) {
	Contractor.findById(id)
	.exec(function(err, contractor) {
		if (err) return next(err);
		if (!contractor) return next(new Error('Failed to load contractor ' + id));
		req.contractor = contractor;
		next();
	});
};

