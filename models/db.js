/// <reference path="../typings/tsd.d.ts" />
var settings = require('../settings');
var mongo = require('mongoose');
mongo.connect('mongodb://localhost/' + settings.dbName);
var db = mongo.connection;
db.on('error', console.error.bind(console, 'connection error:'));
console.log('connected to db');
module.exports = db;
