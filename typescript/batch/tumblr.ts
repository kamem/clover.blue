/// <reference path="../typings/tsd.d.ts" />

var request = require('request');
import apiToDatabase = require('./apiToDatabase');

var API_URI = 'https://api.tumblr.com/v2/';
var API_KEY = 'hOCZhmORpcUgzzDFAJJ2Zq1aTckafCrYw9FoWp2up0EcdvuOYU';
var BLOG_HOST = 'clover-blue.tumblr.com';

var dbItems = new apiToDatabase.Items('tumblr');

export class SaveApi {
	constructor() {
		request.get(API_URI + 'blog/' + BLOG_HOST + '/posts?api_key=' + API_KEY, function (error, response, body) {
			if (!error && response.statusCode == 200) {

				dbItems.saveDatabase(
					JSON.parse(body).response.posts,
					{
						uuid: 'id',
						updated: 'timestamp',
						title: 'title',
						body: 'body',
						tags: 'tags',
						photos: 'photos',
						type: 'type'
					}
				);

				console.log('complate!');
			} else {
				console.log(error);
			}
		}.bind(this));
	}
}

var save = new SaveApi();