var request = require('request');
var mongo = require('mongoose');
var db = require('./models/db');

var API_URI = 'http://spapi.pixiv.net/iphone/member_illust.php';
var USER_ID = 112090;

var itemLimit = 12;
var page = 1;

var entries = mongo.Schema({
	'updated': String,
	'uuid': String,
	'title': String,
	'img': String,
	'thumbnail': String
});

var Items = mongo.model('pixiv_items',entries);

request.get(API_URI + '?id=' + USER_ID, function(error, response, body){
if (!error && response.statusCode == 200) {
	var res = body.split(',');
	var it = [];

	res.forEach(function(item,i) {
		if(!!item && item !== '' && item !== "0") {
			it.push(item);
		};
	});

	var items = [];
	var itemNum = 0;
	it.forEach(function(item,i) {
		if(item.indexOf('\n') >= 0) itemNum++;
		if(!items[itemNum]) items[itemNum] = [];
		items[itemNum].push(item.replace('\n','').replace(/\"/g,''));
	});
	items.pop();


	items.forEach(function(item,i) {

		var uuid = item[0];
		var date = item[8];
		var title = item[14];
		var img = item[7];
		var thumbnail = item[6];

		Items.where({ uuid: uuid }).count(function (err, count) {
			if(count) {
				Items.findOne({uuid: uuid},function(err,post) {
					post.updated = Date.parse(date);
					post.uuid = uuid;
					post.title = title;
					post.img = img;
					post.thumbnail = thumbnail;

					post.save(function(err) {
						if (err) { console.log(err); }
					});
				});
			} else {
				var entry = new Items({
					updated: Date.parse(date),
					uuid: uuid,
					title: title,
					img: img,
					thumbnail: thumbnail
				});
				entry.save(function(err) {
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
