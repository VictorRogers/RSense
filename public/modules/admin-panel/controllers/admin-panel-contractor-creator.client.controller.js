'use strict';

angular.module('admin-panel').controller('AdminPanelContractorCreatorCTRL', ['$scope',
		'$modalInstance', 'Users', 'Authentication', 'ManageContractors',
	function($scope, $modalInstance, Users, Authentication, ManageContractors) {

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
			
		//Create a contractor
		$scope.createContractor = function() {
			$modalInstance.dismiss();
			var contractor = new ManageContractors({
				contractorName: $scope.contractorName,
			});

			contractor.$save(function(response) {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};	

	}
]);
