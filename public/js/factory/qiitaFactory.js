/// <reference path="../typings/tsd.d.ts" />
define(["require", "exports", 'app'], function (require, exports, app) {
    app.factory('qiitaFactory', function ($http) {
        var API_URI = 'https://qiita.com/api/v1/';
        var USER_NAME = 'kamem';
        return {
            getQiitaData: function () {
                return $http.get(API_URI + '/users/' + USER_NAME + '/items').success(function (data, status, headers, config) {
                    return data;
                });
            }
        };
    });
});
