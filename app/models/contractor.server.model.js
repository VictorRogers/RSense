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
		enum: ['Off Site', 'On Site']
	},
	contractorActivityStartDate: {
		type: Date
	},
	contractorActivityEndDate: {
		type: Date
	}
});

mongoose.model('Contractor', ContractorSchema);
