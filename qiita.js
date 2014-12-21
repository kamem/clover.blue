var request = require('request');
var mongo = require('mongoose');
var db = require('./models/db');
var api = 'https://qiita.com/api/v1/';
var userName = 'kamem';

var entries = mongo.Schema({
	'created': String,
	'updated': String,
	'uuid': String,
	'title': String
});
var tags = mongo.Schema({
	'name': String
});

var Entries = mongo.model('qiita_entries',entries);
var Tags = mongo.model('qiita_tags',tags);

var options = {
	form: { url_name: userName, password: 'hdqqhi1341' },
	json: true
};

var token;

request.post(api + '/auth/', options, function(error, response, body){
	if (!error && response.statusCode == 200) {
		request.get(api + '/users/' + userName + '/items?token=' + body.token, function(error, response, body){
			var tags = {};
			if (!error && response.statusCode == 200) {
				var items = JSON.parse(body);
				items.forEach(function(item) {

					Entries.where({ uuid: item.uuid }).count(function (err, count) {
						if(count) {
							Entries.findOne({uuid: item.uuid},function(err,post) {
								post.created = Date.parse(item.created_at);
								post.updated = Date.parse(item.updated_at);
								post.uuid = item.uuid;
								post.title = item.title;

								post.save(function(err) {
									if (err) { console.log(err); }
								});
							});
						} else {
							var entry = new Entries({
								created: Date.parse(item.created_at),
								updated: Date.parse(item.updated_at),
								uuid: item.uuid,
								title: item.title
							});
							entry.save(function(err) {
								if (err) { console.log(err); }
							});
						}
					})

					for (var i = item.tags.length - 1; i >= 0; i--) {
						tags[item.tags[i].name] = item.tags[i].name;
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
} else {
	console.log(error);
}
});

