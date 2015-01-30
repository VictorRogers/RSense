'use strict';

angular.module('admin-panel').controller('AdminPanelContractorManagerCTRL', 
	['$scope', '$stateParams', '$location', 'Users', 'Authentication', 'ManageContractors',
	function($scope, $stateParams, $location, Users, Authentication, ManageContractors) {
		$scope.authentication = Authentication;

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

		//Create a contractor
		$scope.createContractor = function() {
			var contractor = new Contractor({
				contractorName: $scope.contractorName,
			});

			contractor.$save(function(response) {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		//Edit a contractor
		$scope.editContractor = function() {
			var contractor = $scope.managedContractor;
			contractor.contractorStatus = $scope.editStatus;
			contractor.contractorActivityStartDate = moment();
			
			contractor.$update(function() {
				$location.path('manage-contractors');
			}, function(response) {
				$scope.error = response.data.message;
			});
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
