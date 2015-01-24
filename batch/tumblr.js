/// <reference path="../typings/tsd.d.ts" />
var request = require('request');
var apiToDatabase = require('./apiToDatabase');
var cloverBlueDb = require('../db');
var API_URI = 'https://api.tumblr.com/v2/';
var API_KEY = 'hOCZhmORpcUgzzDFAJJ2Zq1aTckafCrYw9FoWp2up0EcdvuOYU';
var BLOG_HOST = 'clover-blue.tumblr.com';
var dbItems = new apiToDatabase.Items('tumblr');
var SaveApi = (function () {
    function SaveApi() {
        request.get(API_URI + 'blog/' + BLOG_HOST + '/posts?api_key=' + API_KEY, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var items = JSON.parse(body).response.posts;
                dbItems.saveDatabase(items, {
                    uuid: 'id',
                    updated: 'timestamp',
                    title: 'title',
                    body: 'body',
                    tags: 'tags',
                    type: 'type'
                });
                var name = 'tumblrDesigns';
                items.forEach(function (item) {
                    cloverBlueDb[name].find({}, function (err, posts) {
                        posts.forEach(function (post) {
                            if (!dbItems.isIdExists(post.uuid, items, 'uuid')) {
                                cloverBlueDb[name].remove({ uuid: post.uuid }, function (err) {
                                });
                            }
                        }.bind(this));
                    }.bind(this));
                    if (item.type === 'photo') {
                        for (var i = 0; i < item.photos.length; i++) {
                            dbItems.saveItem(name, {
                                updated: item.timestamp,
                                uuid: item.id,
                                url: item.photos[i].original_size.url,
                                title: item.caption,
                                tags: item.tags
                            });
                        }
                        ;
                    }
                }.bind(this));
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
