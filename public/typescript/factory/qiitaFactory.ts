/// <reference path="../typings/tsd.d.ts" />

import app = require('app');

app.factory('qiitaFactory', function ($http) {
	var API_URI: string = 'https://qiita.com/api/v1/';
	var USER_NAME: string = 'kamem';


	return {
		getQiitaData: function () {
			return $http.get(API_URI + '/users/' + USER_NAME+ '/items').success(function(data, status, headers, config) {
				return data;
			});
		}
	};
});
