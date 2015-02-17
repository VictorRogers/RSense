'use strict';

angular.module('dashboard').controller('DashboardController', 
['$scope', '$stateParams', '$location', 'Users', 'Socket', 'Authentication',
	'Dashboard', 'ContractorArchive',
	function($scope, $stateParams, $location, Users, Socket, Authentication,
					 Dashboard, ContractorArchive) {
		$scope.authentication = Authentication;

		//Update on new user
		Socket.on('user.created', function(user) {
			$scope.findSentries();
		});

		//Update on updated user
		Socket.on('user.updated', function(user) {
			$scope.findSentries();
		});

		$scope.findSentries = function() {
			$scope.sentries = Dashboard.query();
		};

		$scope.findContractors = function() {
			$scope.contractors = ContractorArchive.contractor.query();
		};
	}
]);
