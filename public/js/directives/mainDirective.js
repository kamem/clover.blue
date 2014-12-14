/// <reference path="../typings/tsd.d.ts" />
define(["require", "exports", 'app'], function (require, exports, app) {
    app.directive('cloverController', ['$timeout', function ($timeout) {
        return function (scope, elem, attrs) {
            scope.$watch(attrs.todoFocus, function (newval) {
            });
        };
    }]);
});
