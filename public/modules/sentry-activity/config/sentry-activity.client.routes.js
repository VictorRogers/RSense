'use strict';

//Setting up route
angular.module('sentry-activity').config(['$stateProvider',
	function($stateProvider) {
		// Sentry activity state routing
		$stateProvider.
		state('editActivity', {
			url: '/sentry-activity/:activityId/edit',
			templateUrl: 'modules/sentry-activity/views/sentry-activity-edit.client.view.html'
		}).
		state('newActivity', {
			url: '/sentry-activity/new',
			templateUrl: 'modules/sentry-activity/views/sentry-activity-new.client.view.html'
		}).
		state('listActivity', {
			url: '/sentry-activity',
			templateUrl: 'modules/sentry-activity/views/sentry-activity-list.client.view.html'
		}).
		state('viewActivity', {
			url: '/sentry-activity/:activityId',
			templateUrl: 'modules/sentry-activity/views/sentry-activity-view.client.view.html'
		});
	}
]);
