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
function sitemap(req, res) {
    res.set('Content-Type', 'text/xml');
    new Post(res, req, 'posts/sitemap', settings.title, '');
}
exports.sitemap = sitemap;
function feed(req, res) {
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
exports.feed = feed;
function feedChild(req, res) {
    res.set('Content-Type', 'text/xml');
    new Post(res, req, 'posts/' + req.path.slice(1), settings.title, '');
}
exports.feedChild = feedChild;
function feedDesign(req, res) {
    res.set('Content-Type', 'text/xml');
    tumblrDesigns.find({}).sort('-updated').exec(function (err, tumblrDesignPosts) {
        res.render('posts/' + req.path.slice(1), {
            title: settings.title,
            tumblrDesigns: tumblrDesignPosts
        });
    });
}
exports.feedDesign = feedDesign;
function template(req, res) {
    res.render(req.path.slice(1));
}
exports.template = template;
function index(req, res) {
    new Post(res, req, 'posts/index', settings.title, '');
}
exports.index = index;
function about(req, res) {
    new Post(res, req, 'posts/about', 'サイトについて' + ' - ' + settings.title, '');
}
exports.about = about;
function design(req, res) {
    tumblrDesigns.find({}).exec(function (err, post) {
        new Post(res, req, 'posts/design', 'デザイン' + ' - ' + settings.title, post);
    });
}
exports.design = design;
function photo(req, res) {
    new Post(res, req, 'posts/photo', '写真' + ' - ' + settings.title, '');
}
exports.photo = photo;
function weblog(req, res) {
    new Post(res, req, 'posts/weblog', '記事' + ' - ' + settings.title, '');
}
exports.weblog = weblog;
function illust(req, res) {
    new Post(res, req, 'posts/illust', 'イラスト' + ' - ' + settings.title, '');
}
exports.illust = illust;
function diary(req, res) {
    new Post(res, req, 'posts/diary', '日記' + ' - ' + settings.title, '');
}
exports.diary = diary;
function tag(req, res) {
    new Post(res, req, 'posts/tags/tag', settings.title, '');
}
exports.tag = tag;
function entry(req, res) {
    var uuid = req.route.path.replace('/items/', '');
    qiitaItems.findOne({ uuid: uuid }).exec(function (err, post) {
        new Post(res, req, 'posts/items/entry', post.title + ' - ' + settings.title, post);
    });
}
exports.entry = entry;
function diaryEntry(req, res) {
    var uuid = req.route.path.replace('/post/', '');
    tumblrItems.findOne({ uuid: uuid }).exec(function (err, post) {
        console.log(post);
        new Post(res, req, 'posts/post/entry', post.title + ' - ' + settings.title, post);
    });
}
exports.diaryEntry = diaryEntry;
var Post = (function () {
    function Post(res, req, template, title, item) {
        var isSearch = isSearchRobotUa(JSON.stringify(req.headers['user-agent']));
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
