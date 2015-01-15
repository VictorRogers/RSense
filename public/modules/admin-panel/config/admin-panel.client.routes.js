'use strict';

//Setting up route
angular.module('admin-panel').config(['$stateProvider',
	function($stateProvider) {
		// Admin panel state routing
		$stateProvider.
		state('admin-panel', {
			url: '/admin-panel',
			templateUrl: 'modules/admin-panel/views/admin-panel.client.view.html'
		});
	}
]);