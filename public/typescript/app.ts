/// <reference path="typings/tsd.d.ts" />

import angular = require('angular');

var module: ng.IModule = angular.module('cloverblue', ['ngStorage', 'ngRoute', 'ngSanitize']);
module.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider.when('/', {
		templateUrl: '/',
		controller: 'cloverController'
	});
}]);

export = module;