'use strict';

angular.module('admin-panel').controller('AdminPanelContractorManagerCTRL', 
	['$scope', '$stateParams', '$location', '$modal', '$log', 'Socket',
	 'Users', 'Authentication', 'ManageContractors',
	function($scope, $stateParams, $location, $modal, $log, Socket, 
					 Users, Authentication, ManageContractors) {

		$scope.authentication = Authentication;

		$scope.openContractorCreator = function() {
			var modalInstance = $modal.open({
				templateUrl: 'modules/admin-panel/views/create-contractor.client.view.html',
				controller: 'AdminPanelContractorCreatorCTRL',
				size: 'sm'
			});
		};

		$scope.changeView = function(option) {
			$location.path(option);
		};

		//Update on new contractor
		Socket.on('contractor.created', function(contractor) {
			$scope.findAllContractors();
		});

		//Update on edited contractor
		Socket.on('contractor.updated', function(contractor) {
			$scope.findAllContractors();
		});	

		//Update on deleted contractor
		Socket.on('contractor.deleted', function(contractor) {
			$scope.findAllContractors();
		});

		//List all contractors
		$scope.findAllContractors = function() {
			$scope.contractorsList = ManageContractors.query();
		};

		//Find a contractor
		$scope.findOneContractor = function() {
			$scope.managedContractor = ManageContractors.get({
				managedContractorId: $stateParams.managedContractorId
			});
		};

		$scope.possibleStatus = ['Off Site', 'On Site'];

		//Edit a contractor
		$scope.editContractor = function() {
			var contractor = $scope.managedContractor;
			contractor.contractorStatus = $scope.editStatus;
			
			contractor.$update(function() {
				$location.path('manage-contractors');
			}, function(response) {
				$scope.error = response.data.message;
			});
		};

		$scope.remove = function(managedContractor) {
			if (managedContractor) {
				managedContractor.$remove();

				for (var i in $scope.contractorsList) {
					if ($scope.contractorsList[i] === managedContractor) {
						$scope.contractorsList.splice(i, 1);
					}
				}
				$location.path('manage-contractors');
			} else {
				$scope.managedContractor.$remove(function() {
					$location.path('manage-contractors');
				});
			}
		};
	
		//Pagination Logic
		//=========================================================================
		$scope.currentPage = 0;
		$scope.pageSize = 10;

		$scope.pages = function() {
			return Math.ceil($scope.contractorsList.length / $scope.pageSize);
		};
		//=========================================================================	
	}
]);
