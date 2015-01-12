var request = require('request');
var mongo = require('mongoose');
var db = require('./models/db');

var API_URI = 'https://api.flickr.com/services/rest/';
var API_KEY = '982ed6872b004b1e646a71f4f5a9970f';
var USER_ID = '37978321@N03';

var itemLimit = 12;
var page = 1;

var entries = mongo.Schema({
	'updated': String,
	'uuid': String,
	'title': String
});
var tags = mongo.Schema({
	'name': String
});

var Entries = mongo.model('flickr_items',entries);
var Tags = mongo.model('flickr_tags',tags);

getApi(API_URI, {
	method: ['photos','search'],
	api_key: API_KEY,
	user_id: USER_ID
},function(res){
	JSON.parse(res.body).photos.photo.forEach(function(photo) {
		getApi(API_URI, {
			api_key: API_KEY,
			method: ['photos','getInfo'],
			photo_id: photo.id,
		},function(res){
	var item = JSON.parse(res.body).photo;
	Entries.where({ uuid: item.id }).count(function (err, count) {
		if(count) {
			Entries.findOne({uuid: item.id},function(err,post) {
				post.updated = item.dateuploaded;
				post.uuid = item.id;
				post.title = item.title._content;

				post.save(function(err) {
					if (err) { console.log(err); }
				});
			});
		} else {
			var entry = new Entries({
				updated: item.dateuploaded,
				uuid: item.id,
				title: item.title._content
			});
			entry.save(function(err) {
				if (err) { console.log(err); }
			});
		}
	})
		});
	});
	console.log('complate!');
});

function getApi(url, search, complate) {
	var url = url + '?';
	var urlAry = [url];
	for(apiName in search) {
		if(apiName === 'method') {
			if(search[apiName]) urlAry.push(apiName + '=flickr.' + search[apiName][0] + '.' + search[apiName][1]);
		} else {
			if(search[apiName]) urlAry.push(apiName + '=' + search[apiName]);
		}
	}

	url = urlAry.join('&');
	url += '&format=json&nojsoncallback=1';

	request.get(url, function(error, response, body){
			complate(response);
	});
}

