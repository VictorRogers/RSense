'use strict';

angular.module('contractors').factory('Contractor', ['$resource',
	function($resource) {
		return $resource('contractor-archive/report/:contractorId', {
			contractorId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
