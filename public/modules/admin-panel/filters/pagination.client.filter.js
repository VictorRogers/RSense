'use strict';

angular.module('admin-panel').filter('pagination', [
	function() {
		return function(input, start) {
			start =+ start;
			return input.slice(start);
		};
	}
]);
