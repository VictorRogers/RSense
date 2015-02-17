'use strict';

angular.module('contractors').controller('ContractorReporterController', 
		['$scope', '$modalInstance', 'Users', 'Authentication',
		 'ContractorArchive', 
	function($scope, $modalInstance, Users, Authentication, ContractorArchive) {
		$scope.authentication = Authentication;
		var user = new Users($scope.user);

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
		
		$scope.findContractors = function() {
			$scope.contractors = ContractorArchive.contractor.query();
		};

		$scope.signIn = function() {
			$modalInstance.dismiss();
			var contractor = $scope.selectedContractor;
			contractor.contractorStatus = 'On Site';
			contractor.contractorActivityStartDate = moment();

			contractor.$update(function(response) {
				$scope.success = true;
			}, function(response) {
				$scope.error = response.data.message;
			});
		};

		$scope.signOut = function() {
			$modalInstance.dismiss();
			var contractor = $scope.selectedContractor;
			contractor.contractorStatus = 'Off Site';
			contractor.contractorActivityEndDate = moment();

			contractor.$update(function(response) {
				$scope.success = true;
			}, function(response) {
				$scope.error = response.data.message;
			});
			
			var end = moment(contractor.contractorActivityEndDate);
			var start = moment(contractor.contractorActivityStartDate);
			var ms = moment(end, "DD/MM/YYYY HH:mm:ss")
							 .diff(moment(start, "DD/MM/YYYY HH:mm:ss"));
			var d = moment.duration(ms);
			var output = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

			var contractorArchive = new ContractorArchive.contractorArchive({
				ContractorName: $scope.selectedContractor.contractorName,
				StartDate: $scope.selectedContractor.contractorActivityStartDate,
				EndDate: $scope.selectedContractor.contractorActivityEndDate,
				Duration: output,
			});

			contractorArchive.$save(function(response) {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
