/// <reference path="../typings/tsd.d.ts" />
'use strict';
define(["require", "exports", 'app'], function (require, exports, app) {
    app.filter('dateParse', function () {
        return function (str) {
            return typeof str === 'string' ? Date.parse(str.replace(/-/g, '/')) : String(str).length < 13 ? parseInt(String(str) + '000') : str;
        };
    });
});
