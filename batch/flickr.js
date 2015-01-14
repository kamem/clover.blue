/// <reference path="../typings/tsd.d.ts" />
var request = require('request');
var apiToDatabase = require('./apiToDatabase');
var API_URI = 'https://api.flickr.com/services/rest/';
var API_KEY = '982ed6872b004b1e646a71f4f5a9970f';
var USER_ID = '37978321@N03';
var MAX = 100;
var dbItems = new apiToDatabase.Items('flickr');
var Api = (function () {
    function Api(url, search) {
        this.url = url;
        this.search = search;
        this.urlAry = [];
        for (var apiName in search) {
            if (apiName === 'method') {
                if (search[apiName])
                    this.urlAry.push(apiName + '=flickr.' + search[apiName][0] + '.' + search[apiName][1]);
            }
            else {
                if (search[apiName])
                    this.urlAry.push(apiName + '=' + search[apiName]);
            }
        }
    }
    Api.prototype.getUri = function () {
        return this.url + '?' + this.urlAry.join('&') + '&format=json&nojsoncallback=1';
    };
    return Api;
})();
var SaveApi = (function () {
    function SaveApi() {
        var serchApi = new Api(API_URI, {
            method: ['photos', 'search'],
            api_key: API_KEY,
            user_id: USER_ID
        });
        var photosCount = 0;
        var items = [];
        request.get(serchApi.getUri(), function (error, res, body) {
            JSON.parse(res.body).photos.photo.forEach(function (photo) {
                var getInfoApi = new Api(API_URI, {
                    method: ['photos', 'getInfo'],
                    api_key: API_KEY,
                    photo_id: photo.id
                });
                request.get(getInfoApi.getUri(), function (error, res, body) {
                    var item = JSON.parse(res.body).photo;
                    photosCount++;
                    items.push(item);
                    dbItems.saveItem('flickrItems', {
                        uuid: item.id,
                        updated: item.dateuploaded,
                        title: item.title._content
                    });
                    if (photosCount === MAX) {
                        dbItems.removeUnnecessaryDbItem('flickrItems', items, 'id');
                        console.log('complate!');
                    }
                });
            });
        });
    }
    return SaveApi;
})();
exports.SaveApi = SaveApi;
var save = new SaveApi();
