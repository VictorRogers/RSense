'use strict';

angular.module('admin-panel').controller('AdminPanelController', 
['$scope', '$stateParams', '$location', 'Users', 'Authentication', 'AdminPanel',
	function($scope, $stateParams, $location, Users, Authentication, AdminPanel) {
		$scope.authentication = Authentication;
		$scope.changeView = function(option) {
			$location.path(option);		
		};
	}
]);
