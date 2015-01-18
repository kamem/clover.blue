/// <reference path="../typings/tsd.d.ts" />
var settings = require('../settings');
var mongo = require('mongoose');
var db = require('../models/db');
var cloverBlueDb = require('../db');
var Feed = require('feed');
var qiitaItems = cloverBlueDb.qiitaItems;
var flickrItems = cloverBlueDb.flickrItems;
var pixivItems = cloverBlueDb.pixivItems;
var tumblrItems = cloverBlueDb.tumblrItems;
exports.feed = function (req, res) {
    res.set('Content-Type', 'text/xml');
    new Post(res, 'posts/feed/feed', settings.title);
};
//exports.feed = function(req,res) {
//	var feed = new Feed({
//		title: settings.title,
//		link: 'http://clover.blue/',
//		description: 'HTML, CSS, Javascript, デザインの記事や日記を書いたり。写真やイラストを載せています。',
//		image: 'http://clover.blue/og.gif',
//		copyright: 'Copyright © settings.title All Rights Reserved.',
//
//		author: {
//			name: 'Kamem',
//			email: '',
//			link: ''
//		}
//	});
//
//	qiitaItems.find({}).sort('-updated').exec(function (err, posts) {
//		for(var key in posts) {
//			feed.addItem({
//				title: posts[key].title,
//				link: 'http://clover.blue/items/' + posts[key].uuid,
//				date: new Date(parseInt(posts[key].updated)),
//				description: posts[key].title
//			});
//		}
//
//		res.set('Content-Type', 'text/xml');
//		res.send(feed.render('rss-2.0'));
//	});
//};
exports.template = function (req, res) {
    res.render(req.path.slice(1));
};
exports.index = function (req, res) {
    new Post(res, 'posts/index', settings.title);
};
exports.about = function (req, res) {
    new Post(res, 'posts/about', 'サイトについて' + ' - ' + settings.title);
};
exports.design = function (req, res) {
    new Post(res, 'posts/design', 'デザイン' + ' - ' + settings.title);
};
exports.photo = function (req, res) {
    new Post(res, 'posts/photo', '写真' + ' - ' + settings.title);
};
exports.weblog = function (req, res) {
    new Post(res, 'posts/weblog', '記事' + ' - ' + settings.title);
};
exports.illust = function (req, res) {
    new Post(res, 'posts/illust', 'イラスト' + ' - ' + settings.title);
};
exports.diary = function (req, res) {
    new Post(res, 'posts/diary', '日記' + ' - ' + settings.title);
};
exports.tag = function (req, res) {
    new Post(res, 'posts/tags/tag', settings.title);
};
exports.entry = function (req, res) {
    var uuid = req.route.path.replace('/items/', '');
    qiitaItems.findOne({ uuid: uuid }).exec(function (err, post) {
        new Post(res, 'posts/items/entry', post.title + ' - ' + settings.title);
    });
};
exports.diaryEntry = function (req, res) {
    var uuid = req.route.path.replace('/post/', '');
    tumblrItems.findOne({ uuid: uuid }).exec(function (err, post) {
        new Post(res, 'posts/items/entry', post.title + ' - ' + settings.title);
    });
};
var Post = (function () {
    function Post(res, template, title) {
        qiitaItems.find({}).sort('-updated').exec(function (err, qiitaPosts) {
            flickrItems.find({}).sort('-updated').exec(function (err, flickPosts) {
                pixivItems.find({}).sort('-updated').exec(function (err, pixivPosts) {
                    tumblrItems.find({}).sort('-updated').exec(function (err, tumblrPosts) {
                        res.render(template, {
                            title: title,
                            qiita: qiitaPosts,
                            flickr: [flickPosts[0]],
                            pixiv: pixivPosts,
                            tumblr: tumblrPosts
                        });
                    });
                });
            });
        });
    }
    return Post;
})();
