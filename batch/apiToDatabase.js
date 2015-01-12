/// <reference path="../typings/tsd.d.ts" />
var mongo = require('mongoose');
var db = require('../models/db');
var cloverBlueDb = require('../db');
var Items = (function () {
    function Items(name) {
        this.name = name;
    }
    Items.prototype.saveDatabase = function (items, itemInfoName) {
        this.removeItems(this.name + 'Items');
        this.removeItems(this.name + 'Tags');
        var tags = {};
        items.forEach(function (item) {
            var itemInfo = {};
            for (var info in itemInfoName) {
                var itemInfoVal = item[itemInfoName[info]];
                if (info === 'updated') {
                    itemInfo[info] = typeof itemInfoVal === 'string' ? Date.parse(itemInfoVal) : itemInfoVal;
                }
                else {
                    itemInfo[info] = itemInfoVal;
                }
            }
            this.saveItem(this.name + 'Items', itemInfo);
            for (var i = item.tags.length - 1; i >= 0; i--) {
                var tagName = item.tags[i].name ? item.tags[i].name : item.tags[i];
                tags[tagName] = tagName;
            }
            ;
        }.bind(this));
        this.saveTags(this.name + 'Tags', tags);
    };
    Items.prototype.removeItems = function (name) {
        if (cloverBlueDb[name]) {
            cloverBlueDb[name].remove({}, function (err) {
            });
        }
    };
    Items.prototype.saveItem = function (name, itemInfo) {
        cloverBlueDb[name].where({ uuid: itemInfo.uuid }).count(function (err, count) {
            if (count) {
                cloverBlueDb[name].findOne({ uuid: itemInfo.uuid }, function (err, post) {
                    for (var info in itemInfo) {
                        post[info] = itemInfo[info];
                    }
                    post.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            }
            else {
                var item = new cloverBlueDb[name](itemInfo);
                item.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    };
    Items.prototype.saveTags = function (name, tags) {
        var tagNames = [];
        for (var tag in tags) {
            tagNames.push(tag);
        }
        tagNames.forEach(function (tag) {
            cloverBlueDb[name].where().count(function (err, count) {
                if (count) {
                    cloverBlueDb[name].findOne({ name: tag }, function (err, tag) {
                        tag.name = tag;
                        tag.save(function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    });
                }
                else {
                    var Tag = new cloverBlueDb[name]({
                        name: tag
                    });
                    Tag.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        });
    };
    return Items;
})();
exports.Items = Items;
