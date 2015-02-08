/// <reference path="typings/tsd.d.ts" />
var mongo = require('mongoose');
var tags = mongo.Schema({
    'name': String
});
exports.qiitaItems = mongo.model('qiita_items', mongo.Schema({
    'updated': String,
    'uuid': String,
    'title': String,
    'body': String,
    'tags': Array
}));
exports.qiitaTags = mongo.model('qiita_tags', tags);
exports.flickrItems = mongo.model('flickr_items', mongo.Schema({
    'updated': String,
    'uuid': String,
    'title': String,
    'farm': String,
    'server': String,
    'secret': String
}));
exports.pixivTags = mongo.model('pixiv_tags', tags);
exports.pixivItems = mongo.model('pixiv_items', mongo.Schema({
    'updated': String,
    'uuid': String,
    'title': String,
    'img': String,
    'thumbnail': String
}));
exports.tumblrItems = mongo.model('tumblr_items', mongo.Schema({
    'updated': String,
    'uuid': String,
    'title': String,
    'body': String,
    'tags': Array,
    'type': String
}));
exports.tumblrTags = mongo.model('tumblr_tags', tags);
exports.tumblrDesigns = mongo.model('tumblr_designs', mongo.Schema({
    'updated': String,
    'uuid': String,
    'url': String,
    'title': String,
    'tags': Array
}));
