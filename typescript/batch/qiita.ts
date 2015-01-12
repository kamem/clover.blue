/// <reference path="../typings/tsd.d.ts" />

var request = require('request');
var mongo = require('mongoose');
var db = require('../models/db');
var cloverBlueDb = require('../db');
var qiitaItems = cloverBlueDb.qiitaItems;
var qiitaTags = cloverBlueDb.qiitaTags;

var API_URI = 'https://qiita.com/api/v1/';
var USER_NAME = 'kamem';

request.get(API_URI + '/users/' + USER_NAME + '/items', function(error, response, body){
	var tags = {};
	if (!error && response.statusCode == 200) {
		var items = JSON.parse(body);
		items.forEach(function(item) {
			qiitaItems.where({ uuid: item.uuid }).count(function (err, count) {
				if(count) {
					qiitaItems.findOne({uuid: item.uuid},function(err,post) {
						post.updated = Date.parse(item.updated_at);
						post.uuid = item.uuid;
						post.title = item.title;

						post.save(function(err) {
							if (err) { console.log(err); }
						});
					});
				} else {
					var entry = new qiitaItems({
						updated: Date.parse(item.updated_at),
						uuid: item.uuid,
						title: item.title
					});
					entry.save(function(err) {
						if (err) { console.log(err); }
					});
				}
			});

			for (var i = item.tags.length - 1; i >= 0; i--) {
				tags[item.tags[i].name] = item.tags[i].name;
			};
		});

		var a = [];
		for(var name in tags) {
			a.push(name);
		}

		a.forEach(function(name) {
			qiitaTags.where().count(function (err, count) {
				if(count) {
					qiitaTags.findOne({name: name}, function(err, tag) {
						tag.name = name;
						tag.save(function(err) {
							if (err) { console.log(err); }
						});
					});
				} else {
					var Tag = new qiitaTags({
						name: name
					});
					Tag.save(function(err) {
						if (err) { console.log(err); }
					});
				}
			})
		});

		console.log('complate!');
	} else {
		console.log(error);
	}
});