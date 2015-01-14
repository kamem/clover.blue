/// <reference path="../typings/tsd.d.ts" />

var mongo = require('mongoose');
var db = require('../models/db');
var cloverBlueDb = require('../db');

export class Items {
	constructor(private name) {
	}

	public saveDatabase(items, itemInfoName) {
		var tags = {};
		items.forEach(function(item) {
			var itemInfo = {};
			for(var info in itemInfoName) {
				var itemInfoVal = item[itemInfoName[info]];
				if(info === 'updated') {
					itemInfo[info] = typeof itemInfoVal === 'string' ? Date.parse(itemInfoVal) : itemInfoVal;
				} else {
					itemInfo[info] = itemInfoVal;
				}
			}
			this.saveItem(
				this.name + 'Items',
				itemInfo
			);

			for (var i = item.tags.length - 1; i >= 0; i--) {
				var tagName = item.tags[i].name ? item.tags[i].name : item.tags[i];
				tags[tagName] = tagName;
			};

		}.bind(this));
		this.removeUnnecessaryDbItem(this.name + 'Items', items, itemInfoName.uuid);


		var tagNames = [];
		for(var tag in tags) {
			tagNames.push(tag);
		}

		tagNames.forEach(function(tagName) {
			this.saveTag(this.name + 'Tags', tagName);
		}.bind(this));
	}

	public removeItems(name) {
		if(cloverBlueDb[name]) {
			cloverBlueDb[name].remove({}, function(err) {});
		}
	}

	public removeUnnecessaryDbItem(name: string , items, subscript) {
		cloverBlueDb[name].find({},function(err, posts) {
			posts.forEach(function(post) {
				if(!this.isIdExists(post.uuid, items, subscript)) {
					cloverBlueDb[name].remove({uuid: post.uuid}, function(err) {});
				}
			}.bind(this));
		}.bind(this));
	}
	public removeUnnecessaryDbTag(name: string , tags, subscript) {
		cloverBlueDb[name].find({},function(err, posts) {
			posts.forEach(function(post) {
				if(!this.isIdExists(post.name, tags, subscript)) {
					cloverBlueDb[name].remove({name: post.name}, function(err) {});
				}
			}.bind(this));
		}.bind(this));
	}
	private isIdExists(value: string , items, subscript): boolean {
		var isValue = false;
		items.forEach(function(item) {
			if(item[subscript] === value) {
				isValue = true;
			}
		}.bind(this));
		return isValue;
	}


	public saveItem(name: string , itemInfo) {
		cloverBlueDb[name].where({ uuid: itemInfo.uuid }).count(function (err, count) {
			if(count) {
				cloverBlueDb[name].findOne({uuid: itemInfo.uuid},function(err, post) {
					for(var info in itemInfo) {
						post[info] = itemInfo[info];
					}

					post.save(function(err) {
						if (err) { console.log(err); }
					});
				});
			} else {
				var item = new cloverBlueDb[name](itemInfo);
				item.save(function(err) {
					if (err) { console.log(err); }
				});
			}
		});
	}

	public saveTag(name, tagName) {
		cloverBlueDb[name].where({ name: tagName }).count(function (err, count) {
			if(count) {
				cloverBlueDb[name].findOne({name: tagName}, function(err, tag) {
					tag.name = tagName;
					tag.save(function(err) {
						if (err) { console.log(err); }
					});
				});
			} else {
				var Tag = new cloverBlueDb[name]({
					name: tagName
				});
				Tag.save(function(err) {
					if (err) { console.log(err); }
				});
			}
		})
	}
}