'use strict';

//Setting up route
angular.module('employees').config(['$stateProvider',
	function($stateProvider) {
		// Employees state routing
		$stateProvider.
		state('view-employee', {
			url: '/employee/:employeeId',
			templateUrl: 'modules/employees/views/view-employee.client.view.html'
		}).
		state('list-employee', {
			url: '/employee',
			templateUrl: 'modules/employees/views/list-employee.client.view.html'
		}).
		state('edit-employee', {
			url: '/employee/:employeeId/edit',
			templateUrl: 'modules/employees/views/edit-employee.client.view.html'
		});
	}
])
