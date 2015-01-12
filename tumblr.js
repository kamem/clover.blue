var request = require('request');
var mongo = require('mongoose');
var db = require('./models/db');

var API_URI = 'https://api.tumblr.com/v2/';
var API_KEY = 'hOCZhmORpcUgzzDFAJJ2Zq1aTckafCrYw9FoWp2up0EcdvuOYU';
var BLOG_HOST = 'clover-blue.tumblr.com';

var entries = mongo.Schema({
	'updated': String,
	'uuid': String,
	'title': String
});
var tags = mongo.Schema({
	'name': String
});

var Entries = mongo.model('tumblr_items',entries);
var Tags = mongo.model('tumblr_tags',tags);

request.get(API_URI + 'blog/' + BLOG_HOST + '/posts?api_key=' + API_KEY, function(error, response, body){
	var tags = {};
	if (!error && response.statusCode == 200) {
		var items = JSON.parse(body).response.posts;
		items.forEach(function(item) {

			Entries.where({ uuid: item.id }).count(function (err, count) {
				if(count) {
					Entries.findOne({uuid: item.id},function(err,post) {
						post.updated = item.timestamp;
						post.uuid = item.id;
						post.title = item.title;

						post.save(function(err) {
							if (err) { console.log(err); }
						});
					});
				} else {
					var entry = new Entries({
						updated: item.timestamp,
						uuid: item.id,
						title: item.title
					});
					entry.save(function(err) {
						if (err) { console.log(err); }
					});
				}
			})

			for (var i = item.tags.length - 1; i >= 0; i--) {
				tags[item.tags[i]] = item.tags[i];
			};
		});

		var a = [];
		for(name in tags) {
			a.push(name);
		}


		a.forEach(function(name) {
			Tags.where().count(function (err, count) {
				if(count) {
					Tags.findOne({name: name}, function(err, tag) {
						tag.name = name;
						tag.save(function(err) {
							if (err) { console.log(err); }
						});
					});
				} else {
					var Tag = new Tags({
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