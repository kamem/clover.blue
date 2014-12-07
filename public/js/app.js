/// <reference path="typings/tsd.d.ts" />
define(["require", "exports", 'angular'], function(require, exports, angular) {
    var module = angular.module('cloverblue', ['ngStorage', 'ngRoute', 'ngSanitize']);
    module.config([
        '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.when('/items/f4da3a0910454556b347', {
                templateUrl: '/items/f4da3a0910454556b347',
                controller: 'cloverController'
            });
        }]);

    
    return module;
});
