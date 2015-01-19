'use strict';

angular.module('dashboard').controller('DashboardController', 
['$scope', '$stateParams', '$location', 'Users', 'Authentication', 'Dashboard',
	function($scope, $stateParams, $location, Users, Authentication, Dashboard) {
		$scope.authentication = Authentication;

		$scope.findSentries = function() {
			$scope.sentries = Dashboard.query();
		};
	}
]);
