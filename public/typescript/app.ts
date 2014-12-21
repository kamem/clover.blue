/// <reference path="typings/tsd.d.ts" />

import angular = require('angular');

var module: ng.IModule = angular.module('cloverblue', ['ngStorage', 'ngRoute', 'ngSanitize']);
module.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$routeProvider.when('/', {
		templateUrl: '/template/index',
		controller: 'index'
	});

	$routeProvider.when('/tags/:tag', {
		templateUrl: '/template/tags/tag',
		controller: 'tag'
	});


	$routeProvider.when('/items/:uuid', {
		templateUrl: function(params) {
			return '/template/items/entry';
		},
		controller: 'entry'
	});
}]);

export = module;