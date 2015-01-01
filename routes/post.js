var settings = require('../settings'),
	mongo = require('mongoose'),
	db = require('../models/db');

var entries = mongo.Schema({
	'created': String,
	'updated': String,
	'uuid': String,
	'title': String
});
var flickr = mongo.Schema({
	'updated': String,
	'uuid': String,
	'title': String
});
var pixiv = mongo.Schema({
	'updated': String,
	'uuid': String,
	'title': String,
	'img': String,
	'thumbnail': String
});

var tags = mongo.Schema({
	'name': String
});

var QiitaEntries = mongo.model('qiita_entries',entries);
var QiitaTags = mongo.model('qiita_tags',tags);
var Flickr = mongo.model('flickr_entries',flickr);
var Pixiv = mongo.model('pixiv_items',pixiv);

exports.QiitaEntries = QiitaEntries;
exports.QiitaTags = QiitaTags;

exports.index = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err,pixivItems) {
				res.render('posts/index',{title: settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems});
			});
		});
	});
};
exports.about = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err,pixivItems) {
				res.render('posts/about',{title: 'サイトについて' + ' - ' + settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems});
			});
		});
	});
};
exports.photo = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err,pixivItems) {
				res.render('posts/about',{title: '写真' + ' - ' + settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems});
			});
		});
	});
};
exports.weblog = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err,pixivItems) {
				res.render('posts/index',{title: '記事' + ' - ' + settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems});
			});
		});
	});
};
exports.illust = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err,pixivItems) {
				res.render('posts/index',{title: 'イラスト' + ' - ' + settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems});
			});
		});
	});
};

exports.entry = function(req,res) {
	var uuid = req.route.path.replace('/items/','');

	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		QiitaEntries.findOne({uuid: uuid}).exec(function(err,post) {
			Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
				Pixiv.find({}).sort('-updated').exec(function(err,pixivItems) {
					res.render('posts/items/entry', {title: post.title + ' - ' + settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems});
				});
			});
		});
	});
};

exports.tag = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err,pixivItems) {
				res.render('posts/tags/tag',{title: settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems});
			});
		});
	});
};


exports.template = function(req,res) {
	res.render(req.path.slice(1));
};