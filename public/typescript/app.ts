/// <reference path="typings/tsd.d.ts" />
'use strict';

import angular = require('angular');
import mainController = require('controllers/mainController');
import mainFactory = require('factory/mainFactory');
import mainService = require('service/mainService');

var module: ng.IModule = angular.module('cloverblue', [
	'ngStorage',
	'ngRoute',
	'ngSanitize'
]);


//service
module.service('mainService', () => new mainService.mainService());

//factory
module.factory('qiitaFactory', ['$http', ($http) => new mainFactory.qiitaFactory($http)]);
module.factory('flickrFactory', ['$http', ($http) => new mainFactory.flickrFactory($http)]);


//controller
module.controller("Normal", ['$scope', 'mainService', ($scope, mainService) => new mainController.Normal($scope, mainService)]);

module.controller('Index',[
	'$scope', 'qiitaFactory', '$localStorage',
	($scope, qiitaFactory, $localStorage) =>
	new mainController.Index($scope, qiitaFactory, $localStorage)
]);

module.controller('Photo',[
	'$scope', 'flickrFactory', '$localStorage', 'filterFilter',
	($scope, flickrFactory, $localStorage, filterFilter) =>
	new mainController.Photo($scope, flickrFactory, $localStorage, filterFilter)
]);

module.controller('Entry',[
	'$scope', 'qiitaFactory', '$localStorage', 'filterFilter', 'mainService',
	($scope, qiitaFactory, $localStorage, filterFilter, mainService) =>
	new mainController.Entry($scope, qiitaFactory, $localStorage, filterFilter, mainService)
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

	$routeProvider.when('/photo', {
		templateUrl: '/template/photo',
		controller: 'Photo'
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
		controller: 'Entry',
  	reloadOnSearch: false
	});
}]);

export = module;