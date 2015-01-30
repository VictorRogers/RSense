'use strict';

angular.module('admin-panel').factory('ManageContractors', ['$resource',
	function($resource) {
		return $resource('manage-contractors/:managedContractorId', {
			managedContractorId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
