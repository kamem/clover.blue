/// <reference path="typings/tsd.d.ts" />
'use strict';

import angular = require('angular');
import mainController = require('controllers/mainController');
import mainFactory = require('factory/mainFactory');

var module: ng.IModule = angular.module('cloverblue', [
	'ngStorage',
	'ngRoute',
	'ngSanitize'
]);


//factory
module.factory('qiitaFactory', ['$http', ($http) => new mainFactory.qiitaFactory($http)]);


//controller
module.controller("Normal", () => new mainController.Normal());

module.controller('Index',[
	'$scope', 'qiitaFactory', '$localStorage',
	($scope, qiitaFactory, $localStorage) =>
	new mainController.Index($scope, qiitaFactory, $localStorage)
]);

module.controller('Entry',[
	'$scope', 'qiitaFactory', '$localStorage', 'filterFilter',
	($scope, qiitaFactory, $localStorage, filterFilter) =>
	new mainController.Entry($scope, qiitaFactory, $localStorage, filterFilter)
]);

module.controller('Tag',[
	'$scope', 'qiitaFactory', '$localStorage', 'filterFilter',
	($scope, qiitaFactory, $localStorage, filterFilter) =>
	new mainController.Tag($scope, qiitaFactory, $localStorage, filterFilter)
]);


//route
module.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$routeProvider.when('/', {
		templateUrl: '/template/index',
		controller: 'Index'
	});

	$routeProvider.when('/about', {
		templateUrl: '/template/about',
		controller: 'Normal'
	});

	$routeProvider.when('/tags/:tag', {
		templateUrl: '/template/tags/tag',
		controller: 'Tag'
	});

	$routeProvider.when('/items/:uuid', {
		templateUrl: function(params) {
			return '/template/items/entry';
		},
		controller: 'Entry'
	});
}]);

export = module;