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
    module.controller("Normal", ['$scope', 'mainService', 'ga', '$timeout', function ($scope, mainService, ga, $timeout) { return new mainController.Normal($scope, mainService, ga, $timeout); }]);
    module.controller('Index', [
        '$scope',
        'mainService',
        'qiitaFactory',
        'tumblrFactory',
        'pixivFactory',
        'flickrFactory',
        '$localStorage',
        'ga',
        '$timeout',
        function ($scope, mainService, qiitaFactory, tumblrFactory, pixivFactory, flickrFactory, $localStorage, ga, $timeout) { return new mainController.Index($scope, mainService, qiitaFactory, tumblrFactory, pixivFactory, flickrFactory, $localStorage, ga, $timeout); }
    ]);
    module.controller('Weblog', [
        '$scope',
        'mainService',
        'qiitaFactory',
        '$localStorage',
        'ga',
        '$timeout',
        function ($scope, mainService, qiitaFactory, $localStorage, ga, $timeout) { return new mainController.Weblog($scope, mainService, qiitaFactory, $localStorage, ga, $timeout); }
    ]);
    module.controller('Tag', [
        '$scope',
        'mainService',
        'qiitaFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        '$timeout',
        function ($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga, $timeout) { return new mainController.Tag($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga, $timeout); }
    ]);
    module.controller('Entry', [
        '$scope',
        'mainService',
        'qiitaFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        '$timeout',
        function ($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga, $timeout) { return new mainController.Entry($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga, $timeout); }
    ]);
    module.controller('Photo', [
        '$scope',
        'mainService',
        'flickrFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        '$timeout',
        function ($scope, mainService, flickrFactory, $localStorage, filterFilter, ga, $timeout) { return new mainController.Photo($scope, mainService, flickrFactory, $localStorage, filterFilter, ga, $timeout); }
    ]);
    module.controller('Illust', [
        '$scope',
        'mainService',
        'pixivFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        '$timeout',
        function ($scope, mainService, pixivFactory, $localStorage, filterFilter, ga, $timeout) { return new mainController.Illust($scope, mainService, pixivFactory, $localStorage, filterFilter, ga, $timeout); }
    ]);
    module.controller('Diary', [
        '$scope',
        'mainService',
        'tumblrFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        '$timeout',
        function ($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga, $timeout) { return new mainController.Diary($scope, mainService, tumblrFactory, $localStorage, ga, $timeout); }
    ]);
    module.controller('TumblrEntry', [
        '$scope',
        'mainService',
        'tumblrFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        '$timeout',
        function ($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga, $timeout) { return new mainController.TumblrEntry($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga, $timeout); }
    ]);
    module.controller('TumblrTag', [
        '$scope',
        'mainService',
        'tumblrFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        '$timeout',
        function ($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga, $timeout) { return new mainController.TumblrTag($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga, $timeout); }
    ]);
    module.controller('Design', [
        '$scope',
        'mainService',
        'tumblrFactory',
        '$localStorage',
        'filterFilter',
        'ga',
        '$timeout',
        function ($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga, $timeout) { return new mainController.Design($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga, $timeout); }
    ]);
    //route
    module.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
        ];
        ROUTEMAP.forEach(function (route) {
            $routeProvider.when(route[0], {
                templateUrl: TEMPLATE_DIRECTORY + route[1],
                controller: route[2],
                reloadOnSearch: false
            });
        });
    }]);
    return module;
});
