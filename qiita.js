var request = require("request");
var mongo = require('mongoose');
var db = require('./models/db');
var api = 'https://qiita.com/api/v1/';
var userName = 'kamem';

var entries = mongo.Schema({
    "created_at": String,
    "updated_at": String,
    'uuid': String
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

          Entries.where({ uuid: i.uuid }).count(function (err, count) {
            if(count) {
                Entries.findOne({uuid: i.uuid},function(err,post) {
                    post.created_at = i.created_at;
                    post.updated_at = i.updated_at;
                    post.uuid = i.uuid;

                    post.save(function(err) {
                      if (err) { console.log(err); }
                    });
                });
            } else {
                var entry = new Entries({
                    created_at: i.created_at,
                    updated_at: i.updated_at,
                    uuid: i.uuid
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
  } else {
     console.log(error);
  }
});

