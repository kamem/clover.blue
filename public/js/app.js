/// <reference path="typings/tsd.d.ts" />
define(["require", "exports", 'angular'], function (require, exports, angular) {
    var module = angular.module('cloverblue', ['ngStorage', 'ngRoute', 'ngSanitize']);
    module.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $routeProvider.when('/', {
            templateUrl: '/template/index',
            controller: 'index'
        });
        $routeProvider.when('/items/:uuid', {
            templateUrl: function (params) {
                return '/template/items/entry';
            },
            controller: 'entry'
        });
    }]);
    return module;
});
