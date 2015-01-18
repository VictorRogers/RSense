'use strict';

angular.module('admin-panel').controller('AdminPanelController', 
['$scope', '$stateParams', '$location', 'Users', 'Authentication',
	function($scope, $stateParams, $location, Users, Authentication) {
		
		$scope.changeView = function(option) {
			$location.path(option);		
		};

	}
]);
