'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Contractor Schema
 */
var ContractorSchema = new Schema({
	contractorName: {
		type: String
	},
	contractorStatus: {
		type: String,
		enum: ['Off Site', 'On Site'],
		default: 'Off Site'
	},
	contractorActivityStartDate: {
		type: Date,
		default: Date.now
	},
	contractorActivityEndDate: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Contractor', ContractorSchema);
