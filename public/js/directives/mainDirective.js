/// <reference path="../typings/tsd.d.ts" />
'use strict';
define(["require", "exports", 'app'], function (require, exports, app) {
    app.directive('sns', function () {
        return {
            restrict: 'E',
            templateUrl: '/template/sns'
        };
    });
});
