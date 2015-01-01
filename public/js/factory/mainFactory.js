/// <reference path="../typings/tsd.d.ts" />
'use strict';
define(["require", "exports"], function (require, exports) {
    var qiitaFactory = (function () {
        function qiitaFactory($http) {
            var API_URI = 'https://qiita.com/api/v1/';
            var USER_NAME = 'kamem';
            return {
                getItems: function () {
                    return $http.get(API_URI + '/users/' + USER_NAME + '/items').success(function (data, status, headers, config) { return data; }).error(function (data, status, headers, config) { return status; });
                },
                getTags: function (items) {
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
    var flickrFactory = (function () {
        function flickrFactory($http) {
            var API_URI = 'https://api.flickr.com/services/rest/';
            var API_KEY = '982ed6872b004b1e646a71f4f5a9970f';
            var USER_ID = '37978321@N03';
            return {
                getItems: function () {
                    return $http.get(flickrFactory.getApiURL(API_URI, {
                        method: ['photos', 'search'],
                        api_key: API_KEY,
                        user_id: USER_ID
                    })).success(function (data, status, headers, config) { return data; }).error(function (data, status, headers, config) { return status; });
                },
                getItemsInfo: function (id) {
                    return $http.get(flickrFactory.getApiURL(API_URI, {
                        method: ['photos', 'getInfo'],
                        api_key: API_KEY,
                        photo_id: id
                    })).success(function (data, status, headers, config) { return data; }).error(function (data, status, headers, config) { return status; });
                },
                getTags: function (items) {
                    var t = {};
                    angular.forEach(items, function (item) {
                        angular.forEach(item.tags, function (tag) {
                            angular.forEach(tag, function (i) {
                                t[i._content] = i._content;
                            });
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
        flickrFactory.getApiURL = function (url, search) {
            var urlAry = [];
            for (var apiName in search) {
                if (apiName === 'method') {
                    if (search[apiName])
                        urlAry.push(apiName + '=flickr.' + search[apiName][0] + '.' + search[apiName][1]);
                }
                else {
                    if (search[apiName])
                        urlAry.push(apiName + '=' + search[apiName]);
                }
            }
            return url + '?' + urlAry.join('&') + '&format=json&nojsoncallback=1';
        };
        return flickrFactory;
    })();
    exports.flickrFactory = flickrFactory;
    var pixivFactory = (function () {
        function pixivFactory($http) {
            var API_URI = 'http://spapi.pixiv.net/iphone/member_illust.php';
            var USER_ID = 112090;
            return {
                getItems: function () {
                    return $http.get(API_URI + '?id=' + USER_ID).success(function (data, status, headers, config) { return data; }).error(function (data, status, headers, config) { return status; });
                },
                getTags: function (items) {
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
        return pixivFactory;
    })();
    exports.pixivFactory = pixivFactory;
});
