var request = require("request");
var mongo = require('mongoose');
var db = require('./models/db');
var api = 'https://qiita.com/api/v1/';
var userName = 'kamem';

var entries = mongo.Schema({
    "title": String,
    "created_at": String,
    "updated_at": String,
    'entry_id': Number
});

var Entries = mongo.model('qiita_entries',entries);

var options = {
  form: { url_name: userName, password: 'hdqqhi1341' },
  json: true
};

var token;

request.post(api + '/auth/', options, function(error, response, body){
  if (!error && response.statusCode == 200) {
    request.get(api + '/users/' + userName + '/items?token=' + body.token, function(error, response, body){
      if (!error && response.statusCode == 200) {
        var items = JSON.parse(body);
        items.forEach(function(i) {

            Entries.where({ entry_id: i.id }).count();
            if(Entries.count({entry_id: i.id})) {
                Entries.findOne({entry_id: i.id},function(err,post) {
                    post.title = i.title;
                    post.created_at = i.created_at;
                    post.updated_at = i.updated_at;
                    post.entry_id = i.id;

                    post.save(function(err) {
                      if (err) { console.log(err); }
                    });
                });
            } else {
                var entry = new Entries({
                    title: i.title,
                    created_at: i.created_at,
                    updated_at: i.updated_at,
                    entry_id: i.id
                });
                entry.save(function(err) {
                  if (err) { console.log(err); }
                });
            }
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

