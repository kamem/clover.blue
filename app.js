var express = require('express'),
	app = express(),
	settings = require('./settings'),
	post = require('./routes/post'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),

	session = require('express-session'),
	RedisStore = require('connect-redis')(session),

	csrf = require('csurf'),

	db = require('./models/db'),
	mongo = require('mongoose');

var QiitaEntries = post.QiitaEntries;
var QiitaTags = post.QiitaTags;
var Tumblr = post.Tumblr;
var TumblrTags = post.TumblrTags;

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


QiitaEntries.find({},function(err,posts) {
	for(entry in posts) {
		app.get('/items/' + posts[entry].uuid, post.entry);
	}
});
QiitaTags.find({},function(err,posts, i) {
	for(tag in posts) {
		app.get('/weblog/tags/' + encodeURI(posts[tag].name), post.tag);
	}
});
Tumblr.find({},function(err,posts) {
	for(entry in posts) {
		app.get('/post/' + posts[entry].uuid, post.diaryEntry);
	}
});
TumblrTags.find({},function(err,posts) {
	for(tag in posts) {
		app.get('/diary/tags/' + encodeURI(posts[tag].name), post.tag);
	}
});

//template
app.get('/template/*', post.template);

app.use(function(err,req,res,next) {
	res.send(err.message);
});

// module.exports = app;

app.listen(settings.port);
console.log('server starting...');
