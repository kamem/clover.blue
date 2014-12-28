/// <reference path="typings/tsd.d.ts" />
'use strict';
define(["require", "exports", 'angular', 'controllers/mainController', 'factory/mainFactory'], function (require, exports, angular, mainController, mainFactory) {
    var module = angular.module('cloverblue', [
        'ngStorage',
        'ngRoute',
        'ngSanitize'
    ]);
    //factory
    module.factory('qiitaFactory', ['$http', function ($http) { return new mainFactory.qiitaFactory($http); }]);
    //controller
    module.controller("Normal", function () { return new mainController.Normal(); });
    module.controller('Index', [
        '$scope',
        'qiitaFactory',
        '$localStorage',
        function ($scope, qiitaFactory, $localStorage) { return new mainController.Index($scope, qiitaFactory, $localStorage); }
    ]);
    module.controller('Entry', [
        '$scope',
        'qiitaFactory',
        '$localStorage',
        'filterFilter',
        function ($scope, qiitaFactory, $localStorage, filterFilter) { return new mainController.Entry($scope, qiitaFactory, $localStorage, filterFilter); }
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
            controller: 'Entry'
        });
    }]);
    return module;
});
