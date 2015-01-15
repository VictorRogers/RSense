'use strict';

angular.module('sentry-activity').factory('SentryActivity', ['$resource',
	function($resource) {
		return $resource('sentry-activity/:activityId', {
			activityId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}	
]);
