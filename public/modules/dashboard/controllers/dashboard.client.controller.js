'use strict';

angular.module('dashboard').controller('DashboardController', 
['$scope', '$stateParams', '$location', 'Users', 'Socket', 'Authentication',
	'Dashboard', 'ContractorArchive',
	function($scope, $stateParams, $location, Users, Socket, Authentication,
					 Dashboard, ContractorArchive) {
		$scope.authentication = Authentication;
		
		//=========================================================================
		//Socket IO Functionality

		//Update on new user
		Socket.on('user.created', function(user) {
			$scope.findSentries();
		});

		//Update on updated user
		Socket.on('user.updated', function(user) {
			$scope.findSentries();
		});

		//Update on new contractor
		Socket.on('contractor.created', function(contractor) {
			$scope.findContractors();
		});

		//Update on updated contractor
		Socket.on('contractor.updated', function(contractor) {
			$scope.findContractors();
		});

		//Update on deleted contractor
		Socket.on('contractor.deleted', function(contractor) {
			$scope.findContractors();
		});
		//=========================================================================

		$scope.findSentries = function() {
			$scope.sentries = Dashboard.query();
		};

		$scope.findContractors = function() {
			$scope.contractors = ContractorArchive.contractor.query();
		};
	}
]);
