'use strict';

angular.module('contractors').controller('ContractorArchiveController',
		['$scope', '$stateParams', '$location', '$modal', '$log',
		 'Users', 'Socket', 'Authentication', 'ContractorArchive',
	function($scope, $stateParams, $location, $modal, $log,
					 Users, Socket, Authentication, ContractorArchive) {
		
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
				url: '/contractor-archive-report/:contractorId',
				templateUrl: 'modules/contractors/views/report-contractor-archive.client.view.html',
				controller: 'ContractorReporterController',
				size: 'sm'
			});
		};

		$scope.editContractorArchive = function() {
			var contractorArchive = $scope.contractorArchive;

			var end = moment(contractorArchive.EndDate);
			var start = moment(contractorArchive.StartDate);

			var ms = moment(end, "DD/MM/YYYY HH:mm:ss")
							 .diff(moment(start, "DD/MM/YYYY HH:mm:ss"));
			var d = moment.duration(ms);
			var output = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

			contractorArchive.Duration = output;

			contractorArchive.$update(function() {
				$location.path('contractor-archive');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};	
		
		$scope.remove = function(contractorArchive) {
			if (contractorArchive) {
				contractorArchive.$remove();

				for (var i in $scope.contractorArchives) {
					if ($scope.contractorArchives[i] === contractorArchive) {
						$scope.contractractorArchives.splice(i, 1);
					}
				}
				$location.path('contractor-archive');
			} else {
				$scope.contractorArchive.$remove(function() {
					$location.path('contractor-archive');
				});
			}
		};

		$scope.find = function() {
			$scope.contractorArchives = ContractorArchive.contractorArchive.query();
		};

		$scope.findOne = function() {
			$scope.contractorArchive = ContractorArchive.contractorArchive.get({
				contractorArchiveId: $stateParams.contractorArchiveId
			});
		};

		//Pagination Logic
		//=========================================================================
		$scope.currentPage = 0;
		$scope.pageSize = 10;

		$scope.pages = function() {
			return Math.ceil($scope.contractorArchives.length / $scope.pageSize);
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
	
	  $scope.openStartDate = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	
	    $scope.sdOpened = true;
	  };

		$scope.openEndDate = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.edOpened = true;
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
