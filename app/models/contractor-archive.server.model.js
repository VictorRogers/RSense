'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ContractorArchive Schema
 */
var ContractorArchiveSchema = new Schema({
	contractorName: {
		type: String
	},
	StartDate: {
		type: Date
	},
	EndDate: {
		type: Date
	},
	Duration: {
	},
	Sentry: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('ContractorArchive', ContractorArchiveSchema);
