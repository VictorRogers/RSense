'use strict';

angular.module('admin-panel').controller('AdminPanelController', 
['$scope', '$stateParams', '$location', 'Users', 'Authentication', 'AdminPanel', 'ManageUsers',
	function($scope, $stateParams, $location, Users, Authentication, AdminPanel, ManageUsers) {
		$scope.authentication = Authentication;
		$scope.changeView = function(option) {
			$location.path(option);		
		};

		$scope.findAllUsers = function() {
			$scope.usersList = ManageUsers.query();
		};

		$scope.findOneUser = function() {
			$scope.managedUser = ManageUsers.get({
				managedUserId: $stateParams.managedUserId
			});
		};
		
		$scope.possibleRoles = ['user', 'sentry', 'admin'];				
		$scope.possibleStatus = ['Inactive', 'Active', 'Monitoring', 'Patrolling', 'Break'];

		$scope.toggleSelection = function toggleSelection(role) {
			var i = $scope.managedUser.roles.indexOf(role);

			if (i > -1) {
				$scope.managedUser.roles.splice(i, 1);
			} else {
				$scope.managedUser.roles.push(role);
			}
		};

		$scope.editUser = function() {
			var user = $scope.managedUser;
			user.sentryStatus = $scope.editStatus;

			user.$update(function() {
				$location.path('manage-users');
			}, function(response) {
				$scope.error = response.data.message;
			});
		};

		//Pagination Logic
		//=========================================================================
		$scope.currentPage = 0;
		$scope.pageSize = 10;

		$scope.pages = function() {
			return Math.ceil($scope.usersList.length / $scope.pageSize);
		};
		//=========================================================================
	}
]);
