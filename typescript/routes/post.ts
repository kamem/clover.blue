/// <reference path="../typings/tsd.d.ts" />

import settings = require('../settings');
var mongo = require('mongoose');
var db = require('../models/db');
import cloverBlueDb = require('../db');

var qiitaItems = cloverBlueDb.qiitaItems;
var flickrItems = cloverBlueDb.flickrItems;
var pixivItems = cloverBlueDb.pixivItems;
var tumblrItems = cloverBlueDb.tumblrItems;
var tumblrDesigns = cloverBlueDb.tumblrDesigns;

export function sitemap(req, res) {
	res.set('Content-Type', 'text/xml');
	new Post(res, req, 'posts/sitemap', settings.title, '');
}

export function feed(req, res) {
	res.set('Content-Type', 'text/xml');
	qiitaItems.find({}).sort('-updated').exec(function (err, qiitaPosts) {
		flickrItems.find({}).sort('-updated').exec(function (err, flickPosts) {
			pixivItems.find({}).sort('-updated').exec(function (err, pixivPosts) {
				tumblrItems.find({}).sort('-updated').exec(function (err, tumblrPosts) {
					tumblrDesigns.find({}).sort('-updated').exec(function (err, tumblrDesignPosts) {
						res.render('posts/feed', {
							title: settings.title,
							qiita: qiitaPosts,
							flickr: flickPosts,
							pixiv: pixivPosts,
							tumblr: tumblrPosts,
							tumblrDesigns: tumblrDesignPosts
						});
					});
				});
			});
		});
	});
}
export function feedChild(req, res) {
	res.set('Content-Type', 'text/xml');
	new Post(res, req, 'posts/' + req.path.slice(1), settings.title, '');
}
export function feedDesign(req, res) {
	res.set('Content-Type', 'text/xml');
	tumblrDesigns.find({}).sort('-updated').exec(function (err, tumblrDesignPosts) {
		res.render('posts/' + req.path.slice(1), {
			title: settings.title,
			tumblrDesigns: tumblrDesignPosts
		});
	});
}

export function template(req, res) {
	res.render(req.path.slice(1));
}

export function index(req, res) {
	new Post(res, req, 'posts/index', settings.title, '');
}
export function about(req, res) {
	new Post(res, req, 'posts/about', 'サイトについて' + ' - ' + settings.title, '');
}
export function design(req, res) {
	tumblrDesigns.find({}).exec(function (err, post) {
		new Post(res, req, 'posts/design', 'デザイン' + ' - ' + settings.title, post);
	});
}
export function photo(req, res) {
	new Post(res, req, 'posts/photo', '写真' + ' - ' + settings.title, '');
}
export function weblog(req, res) {
	new Post(res, req, 'posts/weblog', '記事' + ' - ' + settings.title, '');
}
export function illust(req, res) {
	new Post(res, req, 'posts/illust', 'イラスト' + ' - ' + settings.title, '');
}
export function diary(req, res) {
	new Post(res, req, 'posts/diary', '日記' + ' - ' + settings.title, '');
}
export function tag(req, res) {
	new Post(res, req, 'posts/tags/tag', settings.title, '');
}
export function entry(req, res) {
	var uuid = req.route.path.replace('/items/','');
	qiitaItems.findOne({uuid: uuid}).exec(function (err, post) {
		new Post(res, req, 'posts/items/entry', post.title + ' - ' + settings.title, post);
	});
}
export function diaryEntry(req, res) {
	var uuid = req.route.path.replace('/post/','');
	tumblrItems.findOne({uuid: uuid}).exec(function (err, post) {
		console.log(post);
		new Post(res, req, 'posts/post/entry', post.title + ' - ' + settings.title, post);
	});
}


class Post {
	constructor(res, req, template, title, item) {
		var isSearch = isSearchRobotUa("ua is "+JSON.stringify(req.headers['user-agent']));
		var robotDirectory = isSearch ? 'robot/' : '';

		qiitaItems.find({}).sort('-updated').exec(function (err, qiitaPosts) {
			flickrItems.find({}).sort('-updated').exec(function (err, flickPosts) {
				pixivItems.find({}).sort('-updated').exec(function (err, pixivPosts) {
					tumblrItems.find({}).sort('-updated').exec(function (err, tumblrPosts) {
						res.render(robotDirectory + template, {
							title: title,
							qiita: qiitaPosts,
							flickr: flickPosts,
							pixiv: pixivPosts,
							tumblr: tumblrPosts,
							item : item
						});
					});
				});
			});
		});
	}
}

var isSearchRobotUa = function(ua) {
	var robotUas = [
		'Googlebot',
		'msnbot',
		'Yahoo!',
		'Y!'
	];

	var isSearch;
	robotUas.forEach(function(robotUa) {
		if(!isSearch) {
			isSearch = ua.indexOf(robotUa) >= 0;
		}
	});

	return isSearch;
}