'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

/**
 * SentryActivity Schema
 */
var SentryActivitySchema = new Schema({
	Action: {
		type: [{
			type: String,
			enum: ['Monitor', 'Patrol', 'Break']
		}]
	},
	StartDate: {
		type: Date
	},
	EndDate: {
		type: Date
	},
	Duration: { 
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('SentryActivity', SentryActivitySchema);
