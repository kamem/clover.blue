/// <reference path="../typings/tsd.d.ts" />
'use strict';
define(["require", "exports"], function (require, exports) {
    var qiitaFactory = (function () {
        function qiitaFactory($http) {
            var API_URI = 'https://qiita.com/api/v1/';
            var USER_NAME = 'kamem';
            return {
                getQiitaItems: function () {
                    return $http.get(API_URI + '/users/' + USER_NAME + '/items').success(function (data, status, headers, config) { return data; }).error(function (data, status, headers, config) { return status; });
                },
                getQiitaTags: function (items) {
                    var t = {};
                    angular.forEach(items, function (item) {
                        angular.forEach(item.tags, function (tag) {
                            t[tag.name] = tag.name;
                        });
                    });
                    var tags = [];
                    angular.forEach(t, function (tag) {
                        this.push(tag);
                    }, tags);
                    return tags;
                }
            };
        }
        return qiitaFactory;
    })();
    exports.qiitaFactory = qiitaFactory;
});
