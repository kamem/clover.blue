/// <reference path="../typings/tsd.d.ts" />
var mongo = require('mongoose');
var db = require('../models/db');
var cloverBlueDb = require('../db');
var Items = (function () {
    function Items(name) {
        this.name = name;
    }
    Items.prototype.saveDatabase = function (items, itemInfoName) {
        var tags = {};
        this.removeUnnecessaryDbItem(this.name + 'Items', items, itemInfoName.uuid);
        items.forEach(function (item) {
            var itemInfo = {};
            for (var info in itemInfoName) {
                var itemInfoVal = item[itemInfoName[info]];
                if (info === 'updated') {
                    itemInfo[info] = typeof itemInfoVal === 'string' ? Date.parse(itemInfoVal) : itemInfoVal;
                }
                else if (info === 'tags') {
                    var itemTags = [];
                    for (var i = item.tags.length - 1; i >= 0; i--) {
                        var tagName = item.tags[i].name ? item.tags[i].name : item.tags[i];
                        itemTags.push(tagName);
                    }
                    ;
                    itemInfo[info] = itemTags;
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
        var tagNames = [];
        for (var tag in tags) {
            tagNames.push(tag);
        }
        this.removeUnnecessaryDbTag(this.name + 'Tags', tagNames, '');
        tagNames.forEach(function (tagName) {
            this.saveTag(this.name + 'Tags', tagName);
        }.bind(this));
    };
    Items.prototype.removeItems = function (name) {
        if (cloverBlueDb[name]) {
            cloverBlueDb[name].remove({}, function (err) {
            });
        }
    };
    Items.prototype.removeUnnecessaryDbItem = function (name, items, subscript) {
        cloverBlueDb[name].find({}, function (err, posts) {
            posts.forEach(function (post) {
                if (!this.isIdExists(post.uuid, items, subscript)) {
                    cloverBlueDb[name].remove({ uuid: post.uuid }, function (err) {
                    });
                }
            }.bind(this));
        }.bind(this));
    };
    Items.prototype.removeUnnecessaryDbTag = function (name, tags, subscript) {
        cloverBlueDb[name].find({}, function (err, posts) {
            posts.forEach(function (post) {
                if (!this.isIdExists(post.name, tags, subscript)) {
                    cloverBlueDb[name].remove({ name: post.name }, function (err) {
                    });
                }
            }.bind(this));
        }.bind(this));
    };
    Items.prototype.isIdExists = function (value, items, subscript) {
        var isValue = false;
        items.forEach(function (item) {
            var target = (subscript ? item[subscript] : item);
            var val = typeof target === typeof value ? value : parseInt(value);
            if (target === val) {
                isValue = true;
            }
        }.bind(this));
        return isValue;
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
    Items.prototype.saveTag = function (name, tagName) {
        cloverBlueDb[name].where({ name: tagName }).count(function (err, count) {
            if (count) {
                cloverBlueDb[name].findOne({ name: tagName }, function (err, tag) {
                    tag.name = tagName;
                    tag.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            }
            else {
                var Tag = new cloverBlueDb[name]({
                    name: tagName
                });
                Tag.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    };
    return Items;
})();
exports.Items = Items;
