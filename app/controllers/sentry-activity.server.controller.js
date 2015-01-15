'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
		errorHandler = require('./errors.server.controller'),
		SentryActivity = mongoose.model('SentryActivity'),		
    _ = require('lodash');

/**
 * Create a Sentry activity
 */
exports.create = function(req, res) {
	var activity = new SentryActivity(req.body);
	activity.user = req.user;

	activity.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(activity);
		}
	});
};

/**
 * Show the current Sentry activity
 */
exports.read = function(req, res) {
	res.json(req.activity);
};

/**
 * Update a Sentry activity
 */
exports.update = function(req, res) {
	var activity = req.activity;

	activity = _.extend(activity, req.body);

	activity.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(activity);
		}
	});
};

/**
 * Delete an Sentry activity
 */
exports.delete = function(req, res) {
	var activity = req.activity;

	activity.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(activity);
		}
	});
};

/**
 * List of Sentry activities
 */
exports.list = function(req, res) {
	SentryActivity.find().sort('-StartDate').populate('user', 'displayName')
	.exec(function(err, activity) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(activity);
		}
	});
};

/**
 * Sentry Activity middleware
 */
exports.activityByID = function(req, res, next, id) {
	SentryActivity.findById(id).populate('user', 'displayName')
	.exec(function(err, activity) {
		if (err) return next(err);
		if (!activity) return next(new Error('Failed to load activity ' + id));
		req.activity = activity;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.activity.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
