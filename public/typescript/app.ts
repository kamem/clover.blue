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
module.controller("Normal", ['$scope', 'mainService', 'ga', '$timeout', ($scope, mainService, ga, $timeout) => new mainController.Normal($scope, mainService, ga, $timeout)]);

module.controller('Index',[
	'$scope', 'mainService', 'qiitaFactory', 'tumblrFactory', 'pixivFactory', 'flickrFactory', '$localStorage', 'ga',
	($scope, mainService, qiitaFactory, tumblrFactory, pixivFactory, flickrFactory, $localStorage, ga) =>
	new mainController.Index($scope, mainService, qiitaFactory, tumblrFactory, pixivFactory, flickrFactory, $localStorage, ga)
]);

module.controller('Weblog',[
	'$scope', 'mainService', 'qiitaFactory', '$localStorage', 'ga',
	($scope, mainService, qiitaFactory, $localStorage, ga) =>
	new mainController.Weblog($scope, mainService, qiitaFactory, $localStorage, ga)
]);

module.controller('Tag',[
	'$scope', 'mainService', 'qiitaFactory', '$localStorage', 'filterFilter', 'ga',
	($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga) =>
		new mainController.Tag($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga)
]);

module.controller('Entry',[
	'$scope', 'mainService', 'qiitaFactory', '$localStorage', 'filterFilter', 'ga', '$timeout',
	($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga, $timeout) =>
		new mainController.Entry($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga, $timeout)
]);


module.controller('Photo',[
	'$scope', 'mainService', 'flickrFactory', '$localStorage', 'filterFilter', 'ga',
	($scope, mainService, flickrFactory, $localStorage, filterFilter, ga) =>
		new mainController.Photo($scope, mainService, flickrFactory, $localStorage, filterFilter, ga)
]);


module.controller('Illust',[
	'$scope', 'mainService', 'pixivFactory', '$localStorage', 'filterFilter', 'ga',
	($scope, mainService, pixivFactory, $localStorage, filterFilter, ga) =>
	new mainController.Illust($scope, mainService, pixivFactory, $localStorage, filterFilter, ga)
]);

module.controller('Diary',[
	'$scope', 'mainService', 'tumblrFactory', '$localStorage', 'filterFilter', 'ga',
	($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga) =>
		new mainController.Diary($scope, mainService, tumblrFactory, $localStorage, ga)
]);

module.controller('TumblrEntry',[
	'$scope', 'mainService', 'tumblrFactory', '$localStorage', 'filterFilter', 'ga', '$timeout',
	($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga, $timeout) =>
		new mainController.TumblrEntry($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga, $timeout)
]);

module.controller('TumblrTag',[
	'$scope', 'mainService', 'tumblrFactory', '$localStorage', 'filterFilter', 'ga',
	($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga) =>
		new mainController.TumblrTag($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga)
]);

module.controller('Design',[
	'$scope', 'mainService', 'tumblrFactory', '$localStorage', 'filterFilter', 'ga',
	($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga) =>
		new mainController.Design($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga)
]);


//route
module.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	var TEMPLATE_DIRECTORY = '/template/';
	var ROUTEMAP = [
		['/', 'index', 'Index'],
		['/photo', 'photo', 'Photo'],
		['/design', 'design', 'Design'],
		['/weblog', 'weblog/weblog', 'Weblog'],
		['/illust', 'illust', 'Illust'],
		['/about', 'about', 'Normal'],
		['/diary', 'diary/diary', 'Diary'],
		['/diary/tags/:tag', 'diary/tags/tag', 'TumblrTag'],
		['/post/:uuid', '/diary/post/entry', 'TumblrEntry'],
		['/weblog/tags/:tag', 'weblog/tags/tag', 'Tag'],
		['/items/:uuid', 'weblog/items/entry', 'Entry']
	]
	ROUTEMAP.forEach(function(route) {
		$routeProvider.when(route[0], {
			templateUrl: TEMPLATE_DIRECTORY + route[1],
			controller: route[2],
			reloadOnSearch: false
		});
	});
}]);

export = module;