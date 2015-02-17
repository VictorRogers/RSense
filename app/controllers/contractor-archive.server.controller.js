'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
		errorHandler = require('./errors.server.controller'),
		ContractorArchive = mongoose.model('ContractorArchive'), 
		_ = require('lodash');

/**
 * Create a Contractor archive
 */
exports.create = function(req, res) {
	var contractorArchive = new ContractorArchive(req.body);
	contractorArchive.user = req.user;

	contractorArchive.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('contractorArchive.created', contractorArchive);
			res.json(contractorArchive);
		}
	});
};

/**
 * Show the current Contractor archive
 */
exports.read = function(req, res) {
	res.json(req.contractorArchive);
};

/**
 * Update a Contractor archive
 */
exports.update = function(req, res) {
	var contractorArchive = req.contractorArchive;

	contractorArchive = _.extend(contractorArchive, req.body);

	contractorArchive.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('contractorArchive.updated', contractorArchive);
			res.json(contractorArchive);
		}
	});
};

/**
 * Delete an Contractor archive
 */
exports.delete = function(req, res) {
 var contractorArchive = req.contractorArchive;

 contractorArchive.remove(function(err) {
	 if (err) {
		 return res.status(400).send({
			 message:errorHandler.getErrorMessage(err)
		 });
	 } else {
		 var socketio = req.app.get('socketio');
		 socketio.sockets.emit('contractorArchive.deleted', contractorArchive);
		 res.json(contractorArchive);
	 }
 });
};

/**
 * List of Contractor archives
 */
exports.list = function(req, res) {
	ContractorArchive.find().sort('-StartDate').populate('user', 'displayName')
	.exec(function(err, contractorArchive) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(contractorArchive);
		}
	});
};

exports.contractorArchiveByID = function(req, res, next, id) {
	ContractorArchive.findById(id).populate('user', 'displayName')
	.exec(function(err, contractorArchive) {
		if (err) return next(err);
		if (!contractorArchive) return next(new Error('Failed to load archive ' + id));
		req.contractorArchive = contractorArchive;
		next();
	});
};
