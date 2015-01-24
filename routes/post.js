/// <reference path="../typings/tsd.d.ts" />
var settings = require('../settings');
var mongo = require('mongoose');
var db = require('../models/db');
var cloverBlueDb = require('../db');
var qiitaItems = cloverBlueDb.qiitaItems;
var flickrItems = cloverBlueDb.flickrItems;
var pixivItems = cloverBlueDb.pixivItems;
var tumblrItems = cloverBlueDb.tumblrItems;
var tumblrDesigns = cloverBlueDb.tumblrDesigns;
exports.feed = function (req, res) {
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
};
exports.feedChild = function (req, res) {
    res.set('Content-Type', 'text/xml');
    new Post(res, req, 'posts/' + req.path.slice(1), settings.title, '');
};
exports.feedDesign = function (req, res) {
    res.set('Content-Type', 'text/xml');
    tumblrDesigns.find({}).sort('-updated').exec(function (err, tumblrDesignPosts) {
        res.render('posts/' + req.path.slice(1), {
            title: settings.title,
            tumblrDesigns: tumblrDesignPosts
        });
    });
};
exports.template = function (req, res) {
    res.render(req.path.slice(1));
};
exports.index = function (req, res) {
    new Post(res, req, 'posts/index', settings.title, '');
};
exports.about = function (req, res) {
    new Post(res, req, 'posts/about', 'サイトについて' + ' - ' + settings.title, '');
};
exports.design = function (req, res) {
    tumblrDesigns.find({}).exec(function (err, post) {
        new Post(res, req, 'posts/design', 'デザイン' + ' - ' + settings.title, post);
    });
};
exports.photo = function (req, res) {
    new Post(res, req, 'posts/photo', '写真' + ' - ' + settings.title, '');
};
exports.weblog = function (req, res) {
    new Post(res, req, 'posts/weblog', '記事' + ' - ' + settings.title, '');
};
exports.illust = function (req, res) {
    new Post(res, req, 'posts/illust', 'イラスト' + ' - ' + settings.title, '');
};
exports.diary = function (req, res) {
    new Post(res, req, 'posts/diary', '日記' + ' - ' + settings.title, '');
};
exports.tag = function (req, res) {
    new Post(res, req, 'posts/tags/tag', settings.title, '');
};
exports.entry = function (req, res) {
    var uuid = req.route.path.replace('/items/', '');
    qiitaItems.findOne({ uuid: uuid }).exec(function (err, post) {
        new Post(res, req, 'posts/items/entry', post.title + ' - ' + settings.title, post);
    });
};
exports.diaryEntry = function (req, res) {
    var uuid = req.route.path.replace('/post/', '');
    tumblrItems.findOne({ uuid: uuid }).exec(function (err, post) {
        console.log(post);
        new Post(res, req, 'posts/post/entry', post.title + ' - ' + settings.title, post);
    });
};
var Post = (function () {
    function Post(res, req, template, title, item) {
        var isSearch = isSearchRobotUa("ua is " + JSON.stringify(req.headers['user-agent']));
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
                            item: item
                        });
                    });
                });
            });
        });
    }
    return Post;
})();
var isSearchRobotUa = function (ua) {
    var robotUas = [
        'Googlebot',
        'msnbot',
        'Yahoo!',
        'Y!'
    ];
    var isSearch;
    robotUas.forEach(function (robotUa) {
        if (!isSearch) {
            isSearch = ua.indexOf(robotUa) >= 0;
        }
    });
    return isSearch;
};
