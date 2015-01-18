/// <reference path="../typings/tsd.d.ts" />
var request = require('request');
var apiToDatabase = require('./apiToDatabase');
var API_URI = 'https://qiita.com/api/v1/';
var USER_NAME = 'kamem';
var dbItems = new apiToDatabase.Items('qiita');
var SaveApi = (function () {
    function SaveApi() {
        request.get(API_URI + '/users/' + USER_NAME + '/items', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                dbItems.saveDatabase(JSON.parse(body), {
                    uuid: 'uuid',
                    updated: 'updated_at',
                    title: 'title',
                    body: 'body',
                    tags: 'tags'
                });
                console.log('complate!');
            }
            else {
                console.log(error);
            }
        }.bind(this));
    }
    return SaveApi;
})();
exports.SaveApi = SaveApi;
var save = new SaveApi();
