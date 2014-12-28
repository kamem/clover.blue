/// <reference path="../typings/tsd.d.ts" />
'use strict';

export class qiitaFactory {
  constructor($http) {
		var API_URI: string = 'https://qiita.com/api/v1/';
		var USER_NAME: string = 'kamem';

		return {
			getQiitaItems: () => {
				return $http.get(API_URI + '/users/' + USER_NAME+ '/items').success((data, status, headers, config) =>
					data
				).error((data, status, headers, config) =>
			    status
			  );
			},
			getQiitaTags: (items) => {
				var t = {};
				angular.forEach(items, function(item) {
					angular.forEach(item.tags, function(tag){
						t[tag.name] = tag.name;
					})
				});

				var tags = [];
				angular.forEach(t, function(tag) {
					this.push(tag);
				},tags);

				return tags;
			}
		};
  }
}