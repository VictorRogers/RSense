'use strict';

angular.module('admin-panel').factory('ManageUsers', ['$resource',
	function($resource) {
		return $resource('manage-users/:managedUserId', {
			managedUserId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

