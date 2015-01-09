/// <reference path="../typings/tsd.d.ts" />
'use strict';

export class tumblrFactory {
	constructor($http) {
		var API_URI = 'https://api.tumblr.com/v2/';
		var API_KEY = 'hOCZhmORpcUgzzDFAJJ2Zq1aTckafCrYw9FoWp2up0EcdvuOYU';
		var BLOG_HOST = 'clover-blue.tumblr.com';

		return {
			getItems: () => {
				return $http.jsonp(API_URI + 'blog/' + BLOG_HOST + '/posts?api_key=' + API_KEY + '&callback=JSON_CALLBACK').success((data, status, headers, config) =>
						data
				).error((data, status, headers, config) =>
						status
				);
			},
			getTags: (items): string[] => {
				var t = {};
				angular.forEach(items, function(item) {
					angular.forEach(item.tags, function(tag){
						t[tag] = tag;
					})
				});

				var tags = [];
				angular.forEach(t, function(tag) {
					this.push(tag);
				},tags);
				return tags;
			},
			getPhotos: (items): string[] => {
				var photos = [];
				angular.forEach(items, function(item) {
					angular.forEach(item.photos, function(photo){
						photo.id = item.id;
						photo.caption = item.caption;
						photos.push(photo);
					})
				});
				return photos;
			}
		};
	}
}



export class qiitaFactory {
  constructor($http) {
		var API_URI: string = 'https://qiita.com/api/v1/';
		var USER_NAME: string = 'kamem';

		return {
			getItems: () => {
				return $http.get(API_URI + '/users/' + USER_NAME+ '/items').success((data, status, headers, config) =>
					data
				).error((data, status, headers, config) =>
			    status
			  );
			},
			getTags: (items): string[] => {
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



export class flickrFactory {
  constructor($http) {
		var API_URI: string = 'https://api.flickr.com/services/rest/';
		var API_KEY: string = '982ed6872b004b1e646a71f4f5a9970f';
		var USER_ID: string = '37978321@N03';

		return {
			getItems: () => {
				return $http.get(
					flickrFactory.getApiURL(API_URI, {
						method: ['photos','search'],
						api_key: API_KEY,
						user_id: USER_ID
					}
				)).success((data, status, headers, config) =>
					data
				).error((data, status, headers, config) =>
					status
				);
			},
			getItemsInfo: (id) => {
				return $http.get(
					flickrFactory.getApiURL(API_URI, {
						method: ['photos','getInfo'],
						api_key: API_KEY,
						photo_id: id
					}
				)).success((data, status, headers, config) =>
					data
				).error((data, status, headers, config) =>
					status
				);
			},
			getTags: (items): string[] => {
				var t = {};
				angular.forEach(items, function(item) {
					angular.forEach(item.tags, function(tag){
						angular.forEach(tag, function(i){
						t[i._content] = i._content;
						});
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

	static getApiURL(url, search): string {
		var urlAry = [];
		for(var apiName in search) {
			if(apiName === 'method') {
				if(search[apiName]) urlAry.push(apiName + '=flickr.' + search[apiName][0] + '.' + search[apiName][1]);
			} else {
				if(search[apiName]) urlAry.push(apiName + '=' + search[apiName]);
			}
		}

		return url + '?' + urlAry.join('&') + '&format=json&nojsoncallback=1';
	}
}



export class pixivFactory {
  constructor($http) {
		var API_URI: string = 'http://spapi.pixiv.net/iphone/member_illust.php';
		var USER_ID: number = 112090;

		return {
			getItems: () => {
				return $http.get(API_URI + '?id=' + USER_ID).success((data, status, headers, config) =>
					data
				).error((data, status, headers, config) =>
			    status
			  );
			},
			getTags: (items): string[] => {
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