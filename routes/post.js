var settings = require('../settings'),
	mongo = require('mongoose'),
	db = require('../models/db');

var entries = mongo.Schema({
    'created': String,
    'updated': String,
    'uuid': String,
    'title': String
});

var Entries = mongo.model('qiita_entries',entries);

exports.Entries = Entries;

exports.index = function(req,res) {
	Entries.find({}).sort('-updated').exec(function(err,posts) {
		res.render('posts/index',{title: settings.title, qiita: posts});
	});
};

exports.entry = function(req,res) {
	var uuid = req.route.path.replace('/items/','');

	Entries.find({}).sort('-updated').exec(function(err,posts) {
		Entries.findOne({uuid: uuid}).exec(function(err,post) {
			res.render('posts/entry', {title: post.title, qiita: posts});
		});
	});
};


exports.template = function(req,res) {
	res.render(req.path.slice(1));
};