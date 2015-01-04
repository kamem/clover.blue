/// <reference path="typings/tsd.d.ts" />
'use strict';

import angular = require('angular');
import mainController = require('controllers/mainController');
import mainFactory = require('factory/mainFactory');
import mainService = require('service/mainService');

var module: ng.IModule = angular.module('cloverblue', [
	'ngStorage',
	'ngRoute',
	'ngSanitize',
	'ga'
]);


//service
module.service('mainService', () => new mainService.mainService());

//factory
module.factory('qiitaFactory', ['$http', ($http) => new mainFactory.qiitaFactory($http)]);
module.factory('flickrFactory', ['$http', ($http) => new mainFactory.flickrFactory($http)]);
module.factory('pixivFactory', ['$http', ($http) => new mainFactory.pixivFactory($http)]);


//controller
module.controller("Normal", ['$scope', 'mainService', ($scope, mainService) => new mainController.Normal($scope, mainService)]);

module.controller('Index',[
	'$scope', 'qiitaFactory', '$localStorage', 'ga',
	($scope, qiitaFactory, $localStorage, ga) =>
	new mainController.Index($scope, qiitaFactory, $localStorage, ga)
]);

module.controller('Photo',[
	'$scope', 'flickrFactory', '$localStorage', 'filterFilter', 'ga',
	($scope, flickrFactory, $localStorage, filterFilter, ga) =>
	new mainController.Photo($scope, flickrFactory, $localStorage, filterFilter, ga)
]);

module.controller('Weblog',[
	'$scope', 'qiitaFactory', '$localStorage', 'ga',
	($scope, qiitaFactory, $localStorage, ga) =>
	new mainController.Weblog($scope, qiitaFactory, $localStorage, ga)
]);

module.controller('Illust',[
	'$scope', 'pixivFactory', '$localStorage', 'filterFilter', 'ga',
	($scope, pixivFactory, $localStorage, filterFilter, ga) =>
	new mainController.Illust($scope, pixivFactory, $localStorage, filterFilter, ga)
]);

module.controller('Entry',[
	'$scope', 'qiitaFactory', '$localStorage', 'filterFilter', 'mainService', 'ga',
	($scope, qiitaFactory, $localStorage, filterFilter, mainService, ga) =>
	new mainController.Entry($scope, qiitaFactory, $localStorage, filterFilter, mainService, ga)
]);

module.controller('Tag',[
	'$scope', 'qiitaFactory', '$localStorage', 'filterFilter', 'ga',
	($scope, qiitaFactory, $localStorage, filterFilter, ga) =>
	new mainController.Tag($scope, qiitaFactory, $localStorage, filterFilter, ga)
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

	$routeProvider.when('/weblog', {
		templateUrl: '/template/weblog',
		controller: 'Weblog'
	});

	$routeProvider.when('/illust', {
		templateUrl: '/template/illust',
		controller: 'Illust'
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