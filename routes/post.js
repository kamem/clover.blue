/// <reference path="../typings/tsd.d.ts" />
var settings = require('../settings');
var mongo = require('mongoose');
var db = require('../models/db');
var cloverBlueDb = require('../db');
var qiitaItems = cloverBlueDb.qiitaItems;
var flickrItems = cloverBlueDb.flickrItems;
var pixivItems = cloverBlueDb.pixivItems;
var tumblrItems = cloverBlueDb.tumblrItems;
exports.feed = function (req, res) {
    res.set('Content-Type', 'text/xml');
    new Post(res, 'posts/feed', settings.title);
};
exports.feedChild = function (req, res) {
    res.set('Content-Type', 'text/xml');
    new Post(res, 'posts/' + req.path.slice(1), settings.title);
};
exports.feedDesign = function (req, res) {
    res.set('Content-Type', 'text/xml');
    tumblrItems.find({}).sort('-updated').exec(function (err, tumblrPosts) {
        var photos = [];
        for (var i = 0; i < tumblrPosts.length; i++) {
            if (tumblrPosts[i].photos.length) {
                for (var j = 0; j < tumblrPosts[i].photos.length; j++) {
                    photos.push(tumblrPosts[i].photos[j]);
                    photos[j].updated = tumblrPosts[i].updated;
                }
            }
        }
        console.log(photos);
        res.render('posts/' + req.path.slice(1), {
            title: settings.title,
            tumblr: photos
        });
    });
};
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
                            flickr: flickPosts,
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
