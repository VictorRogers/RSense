'use strict';

angular.module('sentry-activity').controller('SentryActivityReporterController'
	, ['$scope', '$modalInstance', 'Users', 'Authentication', 'SentryActivity',
	function($scope, $modalInstance, Users, Authentication, SentryActivity) {
		$scope.authentication = Authentication;
		var user = new Users($scope.user);

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};

		//Sentry Active Functions
		$scope.onDuty = function() {	
			$modalInstance.dismiss();
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
			$modalInstance.dismiss();
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
			$modalInstance.dismiss();
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
			$modalInstance.dismiss();
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
			$modalInstance.dismiss();
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
			$modalInstance.dismiss();
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
			$modalInstance.dismiss();
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
			$modalInstance.dismiss();
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
	}
]);
