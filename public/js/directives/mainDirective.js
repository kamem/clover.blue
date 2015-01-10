/// <reference path="../typings/tsd.d.ts" />
'use strict';
define(["require", "exports", 'app'], function (require, exports, app) {
    app.directive('sns', function () {
        return {
            restrict: 'E',
            templateUrl: '/template/sns'
        };
    });
    app.directive('colorbox', function () {
        return {
            restrict: 'AC',
            link: function (scope, element, attrs) {
                $(element).colorbox((new Function("return " + attrs.colorbox))());
            }
        };
    });
});
