'use strict';

angular.module('employees').controller('CreateEmployeeController', ['$scope',
		'$modalInstance', 'Users', 'Authentication', 'Employee',
	function($scope, $modalInstance, Users, Authentication, Employee) {

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};

		//Create an employee 
		$scope.createEmployee = function() {
			$modalInstance.dismiss();
			var employee = new Employee({
				EmployeeName: $scope.EmployeeName,
				EmployeeSupervisor: $scope.EmployeeSupervisor,
				EmployeeContactNumber: $scope.EmployeeContactNumber,
				EmployeeStatus: $scope.EmployeeStatus,
				EmployeeDate: $scope.EmployeeDate
			});

			employee.$save(function(response) {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};	

		//Datepicker Controls
		//=========================================================================
		$scope.today = function() {
	    $scope.dt = moment();
	  };
	  $scope.today();
	
	  $scope.clear = function () {
	    $scope.dt = null;
	  };
	
	  $scope.openEmployeeDate = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	
	    $scope.EDOpened = true;
	  };
	
	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };
	
	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  $scope.format = 'MM-dd-yy';
		//=========================================================================
	}
]);
