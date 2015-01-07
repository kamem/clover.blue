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
module.factory('tumblrFactory', ['$http', ($http) => new mainFactory.tumblrFactory($http)]);


//controller
module.controller("Normal", ['$scope', 'mainService', 'ga', ($scope, mainService, ga) => new mainController.Normal($scope, mainService, ga)]);

module.controller('Index',[
	'$scope', 'mainService', 'qiitaFactory', '$localStorage', 'ga',
	($scope, mainService, qiitaFactory, $localStorage, ga) =>
	new mainController.Index($scope, mainService, qiitaFactory, $localStorage, ga)
]);

module.controller('Photo',[
	'$scope', 'mainService', 'flickrFactory', '$localStorage', 'filterFilter', 'ga',
	($scope, mainService, flickrFactory, $localStorage, filterFilter, ga) =>
	new mainController.Photo($scope, mainService, flickrFactory, $localStorage, filterFilter, ga)
]);

module.controller('Weblog',[
	'$scope', 'mainService', 'qiitaFactory', '$localStorage', 'ga',
	($scope, mainService, qiitaFactory, $localStorage, ga) =>
	new mainController.Weblog($scope, mainService, qiitaFactory, $localStorage, ga)
]);

module.controller('Illust',[
	'$scope', 'mainService', 'pixivFactory', '$localStorage', 'filterFilter', 'ga',
	($scope, mainService, pixivFactory, $localStorage, filterFilter, ga) =>
	new mainController.Illust($scope, mainService, pixivFactory, $localStorage, filterFilter, ga)
]);

module.controller('Diary',[
	'$scope', 'mainService', 'tumblrFactory', '$localStorage', 'filterFilter', 'ga',
	($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga) =>
		new mainController.Diary($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga)
]);

module.controller('Entry',[
	'$scope', 'mainService', 'qiitaFactory', '$localStorage', 'filterFilter', 'ga',
	($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga) =>
	new mainController.Entry($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga)
]);

module.controller('Tag',[
	'$scope', 'mainService', 'qiitaFactory', '$localStorage', 'filterFilter', 'ga',
	($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga) =>
	new mainController.Tag($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga)
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

	$routeProvider.when('/diary', {
		templateUrl: '/template/diary',
		controller: 'Diary'
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