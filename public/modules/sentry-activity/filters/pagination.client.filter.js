'use strict';

angular.module('sentry-activity').filter('pagination', [
	function() {
		return function(input, start) {
			start =+ start;
			return input.slice(start);
		};
	}
]);
