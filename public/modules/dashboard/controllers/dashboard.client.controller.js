'use strict';

angular.module('dashboard').controller('DashboardController', 
['$scope', '$stateParams', '$location', 'Users', 'Authentication',
	function($scope, $stateParams, $location, Users, Authentication) {
		$scope.authentication = Authentication;

		$scope.findSentries = function() {
			$scope.sentries = Users.query();
		};
	}
]);
