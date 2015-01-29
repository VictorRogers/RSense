'use strict';

angular.module('sentry-activity').controller('SentryActivityController',
['$scope', '$stateParams', '$location', '$modal', '$log', 
	'Users', 'Socket', 'Authentication', 'SentryActivity', 
	function($scope, $stateParams, $location, $modal,  $log,
					 Users, Socket, Authentication, SentryActivity) {
		$scope.authentication = Authentication;
		var user = new Users($scope.user);		

		//Update on new activity
		Socket.on('activity.created', function(activity) {
			$scope.find();
		});

		//Update on edited activity
		Socket.on('activity.updated', function(activity) {
			$scope.find();
		});

		//Update on deleted activity
		Socket.on('activity.deleted', function(activity) {
			$scope.find();
		});

		$scope.openSentryActivityReporter = function() {
			var modalInstance = $modal.open({
				templateUrl: 'modules/sentry-activity/views/sentry-activity-reporter.client.view.html',
				controller: 'SentryActivityReporterController',
				size: 'sm'
			});
		};

		$scope.editActivity = function() {
			var activity = $scope.activity;

			var end = moment(activity.EndDate);
			var start = moment(activity.StartDate);

			var ms = moment(end, "DD/MM/YYYY HH:mm:ss")
							 .diff(moment(start, "DD/MM/YYYY HH:mm:ss"));
			var d = moment.duration(ms);
			var output = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");	
			
			activity.Duration = output;

			activity.$update(function() {
				$location.path('sentry-activity');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.showMoreResults = function() {
			$scope.activitiesQTY += '10';
		};

		$scope.remove = function(activity) {
			if (activity) {
				activity.$remove();

				for (var i in $scope.activities) {
					if ($scope.activities[i] === activity) {
						$scope.activities.splice(i, 1);
					}
				}
				$location.path('sentry-activity');
			} else {
				$scope.activity.$remove(function() {
					$location.path('sentry-activity');
				});
			}
		};

		$scope.find = function() {
			$scope.activities = SentryActivity.query();
		};
		
		//Pagination Logic
		//=========================================================================
		$scope.currentPage = 0;
		$scope.pageSize = 10;

		$scope.pages = function() {
			return Math.ceil($scope.activities.length / $scope.pageSize);
		};
		//=========================================================================

		$scope.findOne = function() {
			$scope.activity = SentryActivity.get({
				activityId: $stateParams.activityId
			});
		};

		$scope.findCurrentActivity = function() {
			var currentActivity = user.sentryCurrentActivity;
			$scope.currentActivity = SentryActivity.get({
				activityId: $stateParams.activity
			});
		};

		//Datepicker Controls
		//===========================================================================
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
