'use strict';

angular.module('contractors').controller('ContractorsControllerController',
		['$scope', '$stateParams', '$location', '$modal', '$log',
		 'Users', 'Socket', 'Authentication', 'SentryActivity',
	function($scope, $stateParams, $location, $modal, $log,
					 Users, Socket, Authentication) {
		
		$scope.authentication = Authentication;
		var user = new Users($scope.user);

		//Update on new contractor 
		Socket.on('contractorArchive.created', function(contractorArchive) {
			$scope.find();
		});

		//Update on edited contractor 
		Socket.on('contractorArchive.updated', function(contractorArchive) {
			$scope.find();
		});

		//Update on deleted contractor 
		Socket.on('contractorArchive.deleted', function(contractorArchive) {
			$scope.find();
		});

		$scope.openContractorReporter = function() {
			var modalInstance = $modal.open({
				templateUrl: '',
				controller: '',
				size: 'sm'
			});
		};

		$scope.editContractorArchive = function() {
			var contractorArchive = $scope.contractorArchive;

			//TODO - Duration logic

			contractorArchive.$update(function() {
				$location.path('');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};	
	}
]);
