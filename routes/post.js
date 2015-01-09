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
var tumbr = mongo.Schema({
	'updated': String,
	'uuid': String,
	'title': String
});

var tags = mongo.Schema({
	'name': String
});

var QiitaEntries = mongo.model('qiita_entries',entries);
var QiitaTags = mongo.model('qiita_tags',tags);
var Flickr = mongo.model('flickr_entries',flickr);
var Pixiv = mongo.model('pixiv_items',pixiv);
var Tumblr = mongo.model('tumblr_entries',tumbr);
var TumblrTags = mongo.model('tumblr_tags',tags);

exports.QiitaEntries = QiitaEntries;
exports.QiitaTags = QiitaTags;
exports.Tumblr = Tumblr;
exports.TumblrTags = TumblrTags;

exports.index = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err, flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err, pixivItems) {
				Tumblr.find({}).sort('-updated').exec(function(err, tumblrItems) {
					res.render('posts/index',{title: settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems, tumblr: tumblrItems});
				});
			});
		});
	});
};
exports.about = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err, flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err, pixivItems) {
				Tumblr.find({}).sort('-updated').exec(function(err, tumblrItems) {
					res.render('posts/about',{title: 'サイトについて' + ' - ' + settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems, tumblr: tumblrItems});
				});
			});
		});
	});
};
exports.design = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err, flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err, pixivItems) {
				Tumblr.find({}).sort('-updated').exec(function(err, tumblrItems) {
					res.render('posts/index',{title: 'デザイン' + ' - ' + settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems, tumblr: tumblrItems});
				});
			});
		});
	});
};
exports.photo = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err, flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err, pixivItems) {
				Tumblr.find({}).sort('-updated').exec(function(err, tumblrItems) {
					res.render('posts/index',{title: '写真' + ' - ' + settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems, tumblr: tumblrItems});
				});
			});
		});
	});
};
exports.weblog = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err, flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err, pixivItems) {
				Tumblr.find({}).sort('-updated').exec(function(err, tumblrItems) {
					res.render('posts/index',{title: '記事' + ' - ' + settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems, tumblr: tumblrItems});
				});
			});
		});
	});
};

exports.illust = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err,pixivItems) {
				Tumblr.find({}).sort('-updated').exec(function(err, tumblrItems) {
					res.render('posts/index',{title: 'イラスト' + ' - ' + settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems, tumblr: tumblrItems});
				});
			});
		});
	});
};

exports.diary = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err,pixivItems) {
				Tumblr.find({}).sort('-updated').exec(function(err, tumblrItems) {
					res.render('posts/index',{title: '日記' + ' - ' + settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems, tumblr: tumblrItems});
				});
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
					Tumblr.find({}).sort('-updated').exec(function(err, tumblrItems) {
						res.render('posts/items/entry',{title: post.title + ' - ' + settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems, tumblr: tumblrItems});
					});
				});
			});
		});
	});
};


exports.diaryEntry = function(req,res) {
	var uuid = req.route.path.replace('/post/','');

	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err,pixivItems) {
				Tumblr.find({}).sort('-updated').exec(function(err, tumblrItems) {
					Tumblr.findOne({uuid: uuid}).exec(function(err,post) {
						res.render('posts/items/entry',{title: post.title + ' - ' + settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems, tumblr: tumblrItems});
					});
				});
			});
		});
	});
};

exports.tag = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
			Pixiv.find({}).sort('-updated').exec(function(err,pixivItems) {
				Tumblr.find({}).sort('-updated').exec(function(err, tumblrItems) {
					res.render('posts/tags/tag',{title: settings.title, qiita: posts, flickr: flickPosts, pixiv: pixivItems, tumblr: tumblrItems});
				});
			});
		});
	});
};


exports.template = function(req,res) {
	res.render(req.path.slice(1));
};