/// <reference path="typings/tsd.d.ts" />
var mongo = require('mongoose');
var qiitaItems = mongo.Schema({
    'updated': String,
    'uuid': String,
    'title': String,
    'body': String,
    'tags': Array
});
var tumblrItems = mongo.Schema({
    'updated': String,
    'uuid': String,
    'title': String,
    'body': String,
    'tags': Array,
    'type': String
});
var tumblrDesigns = mongo.Schema({
    'updated': String,
    'uuid': String,
    'url': String,
    'title': String,
    'tags': Array
});
var flickrItems = mongo.Schema({
    'updated': String,
    'uuid': String,
    'title': String,
    'farm': String,
    'server': String,
    'secret': String
});
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
var qiitaItems = mongo.model('qiita_items', qiitaItems);
var qiitaTags = mongo.model('qiita_tags', tags);
var flickrItems = mongo.model('flickr_items', flickrItems);
var pixivTags = mongo.model('pixiv_tags', tags);
var pixivItems = mongo.model('pixiv_items', pixiv);
var tumblrItems = mongo.model('tumblr_items', tumblrItems);
var tumblrTags = mongo.model('tumblr_tags', tags);
var tumblrDesigns = mongo.model('tumblr_designs', tumblrDesigns);
exports.qiitaItems = qiitaItems;
exports.qiitaTags = qiitaTags;
exports.flickrItems = flickrItems;
exports.pixivItems = pixivItems;
exports.pixivTags = pixivTags;
exports.tumblrItems = tumblrItems;
exports.tumblrTags = tumblrTags;
exports.tumblrDesigns = tumblrDesigns;
