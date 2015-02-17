'use strict';

//Setting up route
angular.module('contractors').config(['$stateProvider',
	function($stateProvider) {
		// Contractors state routing
		$stateProvider.
		state('edit-contractor-archive', {
			url: '/contractor-archive/:contractorArchiveId/edit',
			templateUrl: 'modules/contractors/views/edit-contractor-archive.client.view.html'
		}).
		state('view-contractor-archive', {
			url: '/contractor-archive/:contractorArchiveId',
			templateUrl: 'modules/contractors/views/view-contractor-archive.client.view.html'
		}).
		state('list-contractor-archive', {
			url: '/contractor-archive',
			templateUrl: 'modules/contractors/views/list-contractor-archive.client.view.html'
		});
	}
]);
