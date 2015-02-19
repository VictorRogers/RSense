'use strict';

angular.module('employees').controller('EmployeesController', 
		['$scope', '$stateParams', '$location', '$modal', '$log',
		 'Users', 'Socket', 'Authentication', 'Employee',
	function($scope, $stateParams, $location, $modal, $log,
					 Users, Socket, Authentication, Employee) {
		
		$scope.authentication = Authentication;
		var user = new Users($scope.user);

		//=========================================================================
		//Socket.io Functionality
		//
		//Update on new employee
		Socket.on('employee.created', function(employee) {
			$scope.find();
		});

		//Update on updated employee
		Socket.on('employee.updated', function(employee) {
			$scope.find();
		});

		//Update on deleted employee
		Socket.on('employee.deleted', function(employee) {
			$scope.find();
		});
		//=========================================================================

		$scope.openEmployeeCreator = function() {
			var modalInstance = $modal.open({
				templateUrl: 'modules/employees/views/create-employee.client.view.html',
				controller: 'CreateEmployeeController',
				size: 'sm'
			});
		};

		$scope.editEmployee = function() {
			var employee = $scope.employee;
			
			employee.$update(function() {
				$location.path('employee');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(employee) {
			if (employee) {
				employee.$remove();

				for (var i in $scope.employees) {
					if ($scope.employees[i] === employee) {
						$scope.employees.splice(i , 1);
					}
				}
				$location.path('employee');
			} else {
				$scope.employee.$remove(function() {
					$location.path('employee');
				});
			}
		};

		$scope.find = function() {
			$scope.employees = Employee.query();
		};

		$scope.findOne = function() {
			$scope.employee = Employee.get({
				employeeId: $stateParams.employeeId
			});
		};

		//Pagination Logic
		//=========================================================================
		$scope.currentPage = 0;
		$scope.pageSize = 10;

		$scope.pages = function() {
			return Math.ceil($scope.employees.length / $scope.pageSize);
		};
		//=========================================================================


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
