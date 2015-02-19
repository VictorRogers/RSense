'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
	EmployeeFirstName: {
		type: String,
		required: 'Please enter a first name'
	},
	EmployeeLastName: {
		type: String,
		required: 'Please enter a last name'
	},
	EmployeeDisplayName: {
		type: String
	},
	EmployeeSupervisorFirstName: {
		type: String
	},
	EmployeeSupervisorLastName: {
		type: String
	},
	EmployeeSupervisorDisplayName: {
		type: String
	},
	EmployeeContactNumber: {
		type: String
	},
	EmployeeStatus: {
		type: String,
		enum: ['Active', 'LOA', 'Suspended', 'Terminated']
	},
	//Status = LOA implies EmployeeDate is the date when the employee will return
	//Status = Suspended implies EmployeeDate is the date of the suspension
	//Status = Terminated implies EmployeeDate is the date of termination
	//Status = Active no date will be displayed
	EmployeeDate: {
		type: Date
	}
});

mongoose.model('Employee', EmployeeSchema);
