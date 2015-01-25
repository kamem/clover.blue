/// <reference path="typings/tsd.d.ts" />

var express = require('express');
var app = express();
var settings = require('./settings');
var post = require('./routes/post');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var csrf = require('csurf');

var db = require('./models/db');
var mongo = require('mongoose');
var cloverBlueDb = require('./db');

var qiitaItems = cloverBlueDb.qiitaItems;
var qiitaTags = cloverBlueDb.qiitaTags;
var tumblrItems = cloverBlueDb.tumblrItems;
var tumblrTags = cloverBlueDb.tumblrTags;

//middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// csrf対策
app.use(cookieParser());
app.use(session({resave: true,saveUninitialized: false, secret: '929nfwamicl'}));
app.use(csrf());
app.use(function(req,res,next) {
	res.locals.csrftoken = req.csrfToken();
	next();
});

app.use(logger('dev'));

//routing
app.get('/', post.index);
app.get('/about', post.about);
app.get('/photo', post.photo);
app.get('/weblog', post.weblog);
app.get('/illust', post.illust);
app.get('/diary', post.diary);
app.get('/design', post.design);


qiitaItems.find({},function(err,posts) {
	for(var entry in posts) {
		app.get('/items/' + posts[entry].uuid, post.entry);
	}
});
qiitaTags.find({},function(err,posts, i) {
	for(var tag in posts) {
		app.get('/weblog/tags/' + encodeURI(posts[tag].name), post.tag);
	}
});
tumblrItems.find({},function(err,posts) {
	for(var entry in posts) {
		app.get('/post/' + posts[entry].uuid, post.diaryEntry);
	}
});
tumblrTags.find({},function(err,posts) {
	for(var tag in posts) {
		app.get('/diary/tags/' + encodeURI(posts[tag].name), post.tag);
	}
});

//template
app.get('/template/*', post.template);

//feed
app.get('/feed', post.feed);
app.get('/feed/illust', post.feedChild);
app.get('/feed/photo', post.feedChild);
app.get('/feed/weblog', post.feedChild);
app.get('/feed/diary', post.feedChild);
app.get('/feed/design', post.feedDesign);

//sitemap
app.get('/sitemap.xml', post.sitemap);



qiitaItems.find({},function(err,posts) {
	for(var entry in posts) {
		app.get('/items/' + posts[entry].uuid, post.entry);
	}
});

//error
app.use(function(err,req,res,next) {
	res.send(err.message);
});

app.listen(settings.port);
console.log('server starting...');
