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
		type: Date,
		default: Date.now
	},
	EndDate: {
		type: Date,
		default: Date.now
	},
	StartTime: {
		type: Date,
		default: Date.now
	},
	EndTime: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('SentryActivity', SentryActivitySchema);
