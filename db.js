/// <reference path="typings/tsd.d.ts" />
var mongo = require('mongoose');
var items = mongo.Schema({
    'updated': String,
    'uuid': String,
    'title': String
});
var tags = mongo.Schema({
    'name': String
});
var pixiv = mongo.Schema({
    'updated': String,
    'uuid': String,
    'title': String,
    'img': String,
    'thumbnail': String
});
var qiitaItems = mongo.model('qiita_items', items);
var qiitaTags = mongo.model('qiita_tags', tags);
var flickrItems = mongo.model('flickr_items', items);
var pixivItems = mongo.model('pixiv_items', pixiv);
var tumblrItems = mongo.model('tumblr_items', items);
var tumblrTags = mongo.model('tumblr_tags', tags);
exports.qiitaItems = qiitaItems;
exports.qiitaTags = qiitaTags;
exports.flickrItems = flickrItems;
exports.pixivItems = pixivItems;
exports.tumblrItems = tumblrItems;
exports.tumblrTags = tumblrTags;
