/// <reference path="typings/tsd.d.ts" />
var mongo = require('mongoose');

var tags = mongo.Schema({
	'name': String
});

export var qiitaItems = mongo.model('qiita_items',mongo.Schema({
	'updated': String,
	'uuid': String,
	'title': String,
	'body': String,
	'tags': Array
}));
export var qiitaTags = mongo.model('qiita_tags',tags);
export var flickrItems = mongo.model('flickr_items',mongo.Schema({
	'updated': String,
	'uuid': String,
	'title': String,
	'farm': String,
	'server': String,
	'secret': String
}));
export var pixivTags = mongo.model('pixiv_tags',tags);
export var pixivItems = mongo.model('pixiv_items',mongo.Schema({
	'updated': String,
	'uuid': String,
	'title': String,
	'img': String,
	'thumbnail': String
}));
export var tumblrItems = mongo.model('tumblr_items',mongo.Schema({
	'updated': String,
	'uuid': String,
	'title': String,
	'body': String,
	'tags': Array,
	'type': String
}));
export var tumblrTags = mongo.model('tumblr_tags',tags);
export var tumblrDesigns = mongo.model('tumblr_designs',mongo.Schema({
	'updated': String,
	'uuid': String,
	'url': String,
	'title': String,
	'tags': Array
}));