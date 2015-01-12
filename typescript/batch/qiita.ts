/// <reference path="../typings/tsd.d.ts" />

var request = require('request');
import apiToDatabase = require('./apiToDatabase');

var API_URI = 'https://qiita.com/api/v1/';
var USER_NAME = 'kamem';

var dbItems = new apiToDatabase.Items('qiita');

export class SaveApi {
	constructor(){
		request.get(API_URI + '/users/' + USER_NAME + '/items', function(error, response, body){
			if (!error && response.statusCode == 200) {

				dbItems.saveDatabase(
					JSON.parse(body),
					{
						uuid: 'uuid',
						updated: 'updated_at',
						title: 'title'
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