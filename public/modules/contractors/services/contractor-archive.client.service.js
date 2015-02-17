'use strict';

angular.module('contractors').factory('ContractorArchive', ['$resource',
	function($resource) {
		return {
			contractorArchive: $resource('contractor-archive/:contractorArchiveId', {
				contractorArchiveId: '@_id'
			}, {
				update: {
					method: 'PUT'
				}
			}),
			contractor: $resource('contractor-archive-report/:contractorId', {
				contractorId: '@_id'
			}, {
				update: {
					method: 'PUT'
				}
			})
		};
	}
]);
