'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
		errorHandler = require('./errors.server.controller'),
		Employee = mongoose.model('Employee'),
		_ = require('lodash');

/**
 * Create a Employee
 */
exports.create = function(req, res) {
	var employee = new Employee(req.body);
	
	employee.EmployeeDisplayName = employee.EmployeeFirstName + ' ' +
																 employee.EmployeeLastName;

	employee.EmployeeSupervisorDisplayName = employee.EmployeeSupervisorFirstName
																					 + ' ' +
																					 employee.EmployeeSupervisorLastName;

	employee.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('employee.created', employee);
			res.json(employee);
		}
	});
};

/**
 * Show the current Employee
 */
exports.read = function(req, res) {
	res.json(req.employee);
};

/**
 * Update a Employee
 */
exports.update = function(req, res) {
	var employee = req.employee;

	employee = _.extend(employee, req.body);

	employee.EmployeeDisplayName = employee.EmployeeFirstName + ' ' +
																 employee.EmployeeLastName;

	employee.EmployeeSupervisorDisplayName = employee.EmployeeSupervisorFirstName
																					 + ' ' +
																					 employee.EmployeeSupervisorLastName;

	employee.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('employee.updated', employee);
			res.json(employee);
		}
	});
};

/**
 * Delete an Employee
 */
exports.delete = function(req, res) {
	var employee = req.employee;

	employee.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message:errorHandler.getErrorMessage(err)
			});
		} else {
			var socketio = req.app.get('socketio');
			socketio.sockets.emit('employee.deleted', employee);
			res.json(employee);
		}
	});
};

/**
 * List of Employees
 */
exports.list = function(req, res) {
	Employee.find().sort('EmployeeLastName')
	.exec(function(err, employee) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(employee);
		}
	});
};


exports.employeeByID = function(req, res, next, id) {
	Employee.findById(id)
	.exec(function(err, employee) {
		if (err) return next(err);
		if (!employee) return next(new Error('Failed to load employee ' + id));
		req.employee = employee;
		next();
	});
};
