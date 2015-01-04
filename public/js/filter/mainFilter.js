/// <reference path="../typings/tsd.d.ts" />
'use strict';
define(["require", "exports", 'app'], function (require, exports, app) {
    app.filter('dateParse', function () {
        return function (str) {
            return !!str ? Date.parse(str.replace(/-/g, '/')) : str;
        };
    });
});
