'use strict';

angular.module('dashboard').factory('Dashboard', ['$resource',
	function($resource) {
		return $resource('dashboard');
	}
]);

