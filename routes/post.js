var settings = require('../settings'),
	mongo = require('mongoose'),
	db = require('../models/db');

var entries = mongo.Schema({
    "created_at": String,
    "updated_at": String,
    'uuid': String
});

var Entries = mongo.model('qiita_entries',entries);

exports.Entries = Entries;

exports.index = function(req,res) {
	Entries.find({},function(err,posts) {
		res.render('posts/index',{posts: posts});
	});
};