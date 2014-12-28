define(["require", "exports", 'app'], function (require, exports, app) {
    /// <reference path="../typings/tsd.d.ts" />
    app.filter('dateParse', function () {
        return function (str) {
            return !!str ? Date.parse(str.replace(/-/g, '/')) : str;
        };
    });
    app.filter('tree', function () {
        return function (str) {
            return str.match(/<[hH][1-3].*?>/g);
        };
    });
});
