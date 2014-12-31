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

var tags = mongo.Schema({
	'name': String
});

var QiitaEntries = mongo.model('qiita_entries',entries);
var QiitaTags = mongo.model('qiita_tags',tags);
var Flickr = mongo.model('flickr_entries',flickr);

exports.QiitaEntries = QiitaEntries;
exports.QiitaTags = QiitaTags;

exports.index = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
			res.render('posts/index',{title: settings.title, qiita: posts, flickr: flickPosts});
		});
	});
};
exports.about = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
			res.render('posts/about',{title: 'サイトについて' + ' - ' + settings.title, qiita: posts, flickr: flickPosts});
		});
	});
};
exports.photo = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
			res.render('posts/about',{title: '写真' + ' - ' + settings.title, qiita: posts, flickr: flickPosts});
		});
	});
};

exports.entry = function(req,res) {
	var uuid = req.route.path.replace('/items/','');

	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		QiitaEntries.findOne({uuid: uuid}).exec(function(err,post) {
			Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
				res.render('posts/items/entry', {title: post.title + ' - ' + settings.title, qiita: posts, flickr: flickPosts});
			});
		});
	});
};

exports.tag = function(req,res) {
	QiitaEntries.find({}).sort('-updated').exec(function(err,posts) {
		Flickr.find({}).sort('-updated').exec(function(err,flickPosts) {
			res.render('posts/tags/tag',{title: settings.title, qiita: posts, flickr: flickPosts});
		});
	});
};


exports.template = function(req,res) {
	res.render(req.path.slice(1));
};