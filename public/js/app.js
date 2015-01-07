/// <reference path="typings/tsd.d.ts" />
'use strict';
define(["require", "exports", 'angular', 'controllers/mainController', 'factory/mainFactory', 'service/mainService'], function (require, exports, angular, mainController, mainFactory, mainService) {
    var module = angular.module('cloverblue', [
        'ngStorage',
        'ngRoute',
        'ngSanitize',
        'ga'
    ]);
    //service
    module.service('mainService', function () { return new mainService.mainService(); });
    //factory
    module.factory('qiitaFactory', ['$http', function ($http) { return new mainFactory.qiitaFactory($http); }]);
    module.factory('flickrFactory', ['$http', function ($http) { return new mainFactory.flickrFactory($http); }]);
    module.factory('pixivFactory', ['$http', function ($http) { return new mainFactory.pixivFactory($http); }]);
    module.factory('tumblrFactory', ['$http', function ($http) { return new mainFactory.tumblrFactory($http); }]);
    //controller
    module.controller("Normal", ['$scope', 'mainService', 'ga', function ($scope, mainService, ga) { return new mainController.Normal($scope, mainService, ga); }]);
    module.controller('Index', [
        '$scope',
        'mainService',
        'qiitaFactory',
        '$localStorage',
        'ga',
        function ($scope, mainService, qiitaFactory, $localStorage, ga) { return new mainController.Index($scope, mainService, qiitaFactory, $localStorage, ga); }
    ]);
    module.controller('Photo', [
        '$scope',
        'mainService',
        'flickrFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        function ($scope, mainService, flickrFactory, $localStorage, filterFilter, ga) { return new mainController.Photo($scope, mainService, flickrFactory, $localStorage, filterFilter, ga); }
    ]);
    module.controller('Weblog', [
        '$scope',
        'mainService',
        'qiitaFactory',
        '$localStorage',
        'ga',
        function ($scope, mainService, qiitaFactory, $localStorage, ga) { return new mainController.Weblog($scope, mainService, qiitaFactory, $localStorage, ga); }
    ]);
    module.controller('Illust', [
        '$scope',
        'mainService',
        'pixivFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        function ($scope, mainService, pixivFactory, $localStorage, filterFilter, ga) { return new mainController.Illust($scope, mainService, pixivFactory, $localStorage, filterFilter, ga); }
    ]);
    module.controller('Diary', [
        '$scope',
        'mainService',
        'tumblrFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        function ($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga) { return new mainController.Diary($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga); }
    ]);
    module.controller('Entry', [
        '$scope',
        'mainService',
        'qiitaFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        function ($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga) { return new mainController.Entry($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga); }
    ]);
    module.controller('Tag', [
        '$scope',
        'mainService',
        'qiitaFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        function ($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga) { return new mainController.Tag($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga); }
    ]);
    //route
    module.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
            templateUrl: function (params) {
                return '/template/items/entry';
            },
            controller: 'Entry',
            reloadOnSearch: false
        });
    }]);
    return module;
});
