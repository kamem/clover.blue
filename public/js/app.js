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
    //controller
    module.controller("Normal", ['$scope', 'mainService', function ($scope, mainService) { return new mainController.Normal($scope, mainService); }]);
    module.controller('Index', [
        '$scope',
        'qiitaFactory',
        '$localStorage',
        'ga',
        function ($scope, qiitaFactory, $localStorage, ga) { return new mainController.Index($scope, qiitaFactory, $localStorage, ga); }
    ]);
    module.controller('Photo', [
        '$scope',
        'flickrFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        function ($scope, flickrFactory, $localStorage, filterFilter, ga) { return new mainController.Photo($scope, flickrFactory, $localStorage, filterFilter, ga); }
    ]);
    module.controller('Weblog', [
        '$scope',
        'qiitaFactory',
        '$localStorage',
        'ga',
        function ($scope, qiitaFactory, $localStorage, ga) { return new mainController.Weblog($scope, qiitaFactory, $localStorage, ga); }
    ]);
    module.controller('Illust', [
        '$scope',
        'pixivFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        function ($scope, pixivFactory, $localStorage, filterFilter, ga) { return new mainController.Illust($scope, pixivFactory, $localStorage, filterFilter, ga); }
    ]);
    module.controller('Entry', [
        '$scope',
        'qiitaFactory',
        '$localStorage',
        'filterFilter',
        'mainService',
        'ga',
        function ($scope, qiitaFactory, $localStorage, filterFilter, mainService, ga) { return new mainController.Entry($scope, qiitaFactory, $localStorage, filterFilter, mainService, ga); }
    ]);
    module.controller('Tag', [
        '$scope',
        'qiitaFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        function ($scope, qiitaFactory, $localStorage, filterFilter, ga) { return new mainController.Tag($scope, qiitaFactory, $localStorage, filterFilter, ga); }
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
