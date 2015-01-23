'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		req.profile = user;
		next();
	});
};

exports.manageUserByID = function(req, res, next, id) {
	if (!req.user || req.user.roles.indexOf('admin') == -1) {
		return res.status(403).send({
			message: 'User is not authorized'
		})
	};
	User.findOne({
		_id: id
	}, function(err, manageUser) {
		if (err) {
			return next(err);
		} else {
			req.user = manageUser;
			next();
		}
	});
};

exports.adminRead = function(req, res) {
	res.json(req.user);
};



exports.listSentries = function(req, res) {
	User.find({roles: 'sentry'})
	.exec(function(err, sentry) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(sentry);
		}
	});
};


exports.listUsers = function(req, res) {
	User.find()
	.exec(function(err, usersList) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(usersList);
		}
	});
};

exports.adminUpdate = function(req, res) {	
	var user = req.user;		
	
	user = _.extend(user, req.body);

user.displayName = user.firstName + ' ' + user.lastName;

	
	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});	
};


/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'User is not authorized'
				});
			}
		});
	};
};
