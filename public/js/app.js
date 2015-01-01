/// <reference path="typings/tsd.d.ts" />
'use strict';
define(["require", "exports", 'angular', 'controllers/mainController', 'factory/mainFactory', 'service/mainService'], function (require, exports, angular, mainController, mainFactory, mainService) {
    var module = angular.module('cloverblue', [
        'ngStorage',
        'ngRoute',
        'ngSanitize'
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
        function ($scope, qiitaFactory, $localStorage) { return new mainController.Index($scope, qiitaFactory, $localStorage); }
    ]);
    module.controller('Photo', [
        '$scope',
        'flickrFactory',
        '$localStorage',
        'filterFilter',
        function ($scope, flickrFactory, $localStorage, filterFilter) { return new mainController.Photo($scope, flickrFactory, $localStorage, filterFilter); }
    ]);
    module.controller('Weblog', [
        '$scope',
        'qiitaFactory',
        '$localStorage',
        function ($scope, qiitaFactory, $localStorage) { return new mainController.Index($scope, qiitaFactory, $localStorage); }
    ]);
    module.controller('Illust', [
        '$scope',
        'pixivFactory',
        '$localStorage',
        'filterFilter',
        function ($scope, pixivFactory, $localStorage, filterFilter) { return new mainController.Illust($scope, pixivFactory, $localStorage, filterFilter); }
    ]);
    module.controller('Entry', [
        '$scope',
        'qiitaFactory',
        '$localStorage',
        'filterFilter',
        'mainService',
        function ($scope, qiitaFactory, $localStorage, filterFilter, mainService) { return new mainController.Entry($scope, qiitaFactory, $localStorage, filterFilter, mainService); }
    ]);
    module.controller('Tag', [
        '$scope',
        'qiitaFactory',
        '$localStorage',
        'filterFilter',
        function ($scope, qiitaFactory, $localStorage, filterFilter) { return new mainController.Tag($scope, qiitaFactory, $localStorage, filterFilter); }
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
