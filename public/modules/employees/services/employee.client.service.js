'use strict';

angular.module('employees').factory('Employee', ['$resource',
	function($resource) {
		return $resource('employee/:employeeId', {
			employeeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
