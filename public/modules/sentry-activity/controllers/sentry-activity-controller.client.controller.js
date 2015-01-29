'use strict';

angular.module('sentry-activity').controller('SentryActivityController',
['$scope', '$stateParams', '$location', 'Users', 'Socket',
 'Authentication', 'SentryActivity', 
	function($scope, $stateParams, $location, Users, Socket,
					 Authentication, SentryActivity) {
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

		//Sentry Active Functions
		$scope.onDuty = function() {	
			user.sentryStatus = 'Active';
			user.sentryCurrentActivityStartDate = moment();

			user.$update(function(response) {
				$scope.success = true;
				Authentication.user = response;
			}, function(response) {
				$scope.error = response.data.message;
			});
		};

		$scope.offDuty = function() {
			$location.path('sentry-activity');
			user.sentryStatus = 'Inactive';
			user.sentryCurrentActivityStartDate = moment();

			user.$update(function(response) {
				$scope.success = true;
				Authentication.user = response;
			}, function(response) {
				$scope.error = response.data.message;
			});
		};
		
		//Patrol Functions
		$scope.beginPatrol = function() {
		  $location.path('sentry-activity');	
			user.sentryStatus = 'Patrolling';	
			user.sentryCurrentActivityStartDate = moment(); 	

			user.$update(function(response) {
				$scope.success = true;
				Authentication.user = response;
			}, function(response) {
				$scope.error = response.data.message;
			});
		};
		
		$scope.endPatrol = function() {
			$location.path('sentry-activity');
			user.sentryCurrentActivityEndDate = moment();

			user.sentryStatus = 'Active';

			user.$update(function(response) {
				$scope.success = true;
				Authentication.user = response;
			}, function(response) {
				$scope.error = response.data.message;
			});
			
			var end = moment(user.sentryCurrentActivityEndDate);
			var start = moment(Authentication.user.sentryCurrentActivityStartDate);

			var ms = moment(end, "DD/MM/YYYY HH:mm:ss")
							 .diff(moment(start, "DD/MM/YYYY HH:mm:ss"));
			var d = moment.duration(ms);
			var output = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");	

			var activity = new SentryActivity({
				Action: 'Patrol',
				StartDate: Authentication.user.sentryCurrentActivityStartDate,
				EndDate: user.sentryCurrentActivityEndDate,
				Duration: output,
			});
			
			activity.$save(function(response) {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		//Monitoring Functions
		$scope.beginMonitor = function() {
		  $location.path('sentry-activity');	
			user.sentryStatus = 'Monitoring';	
			user.sentryCurrentActivityStartDate = moment(); 

			user.$update(function(response) {
				$scope.success = true;
				Authentication.user = response;
			}, function(response) {
				$scope.error = response.data.message;
			});
		};	

		$scope.endMonitor = function() {
			$location.path('sentry-activity');
			user.sentryCurrentActivityEndDate = moment();
			user.sentryStatus = 'Active';

			user.$update(function(response) {
				$scope.success = true;
				Authentication.user = response;
			}, function(response) {
				$scope.error = response.data.message;
			});

			var end = moment(user.sentryCurrentActivityEndDate);
			var start = moment(Authentication.user.sentryCurrentActivityStartDate);

			var ms = moment(end, "DD/MM/YYYY HH:mm:ss")
							 .diff(moment(start, "DD/MM/YYYY HH:mm:ss"));
			var d = moment.duration(ms);
			var output = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");	

			var activity = new SentryActivity({
				Action: 'Monitor',
				StartDate: Authentication.user.sentryCurrentActivityStartDate,
				EndDate: user.sentryCurrentActivityEndDate,
				Duration: output,
			});

			activity.$save(function(response) {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		//Break Functions
		$scope.beginBreak = function() {
		  $location.path('sentry-activity');	
			user.sentryStatus = 'Break';	
			user.sentryCurrentActivityStartDate = moment(); 

			user.$update(function(response) {
				$scope.success = true;
				Authentication.user = response;
			}, function(response) {
				$scope.error = response.data.message;
			});
		};	

		$scope.endBreak = function() {
			$location.path('sentry-activity');
			user.sentryCurrentActivityEndDate = moment();
			user.sentryStatus = 'Active';

			user.$update(function(response) {
				$scope.success = true;
				Authentication.user = response;
			}, function(response) {
				$scope.error = response.data.message;
			});
		
			var end = moment(user.sentryCurrentActivityEndDate);
			var start = moment(Authentication.user.sentryCurrentActivityStartDate);

			var ms = moment(end, "DD/MM/YYYY HH:mm:ss")
							 .diff(moment(start, "DD/MM/YYYY HH:mm:ss"));
			var d = moment.duration(ms);
			var output = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");	

			var activity = new SentryActivity({
				Action: 'Break',
				StartDate: Authentication.user.sentryCurrentActivityStartDate,
				EndDate: user.sentryCurrentActivityEndDate,
				Duration: output,
			});
			
			activity.$save(function(response) {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
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
		//=============================================================================
	}
]);
