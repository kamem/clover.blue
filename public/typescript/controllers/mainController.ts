/// <reference path="../typings/tsd.d.ts" />
'use strict';

declare var qiita;
declare var flickr;
declare var pixiv;
declare var tumblr;

import prettify = require('prettify');

export class Normal {
  constructor($scope, mainService, ga) {
    angular.element(document.querySelectorAll("#header")).addClass("off");
		ga('send', 'pageview');

    angular.element(document).ready(() => {
    	mainService.CreatePageNav($scope);
			$scope.$apply();
			mainService.ChangeTitle();
			mainService.LoadSns();
    });
  }
}

export class Index {
  constructor($scope, mainService, qiitaFactory, $localStorage, ga) {
		var page = new entry.CreatePage($scope, mainService, qiitaFactory, $localStorage, 'qiita', '', ga);
		page.removeClassElement = "#header";
		page.addClassElement = "article h1";

		page.latestUpdated = qiita[0].updated;
		if($scope.$storage.qiita) page.storageUpdated = Date.parse($scope.$storage.qiita[0].updated_at.replace(/-/g, '/'));
		page.setClass();
		page.load();
  }
}

export class Photo {
  constructor($scope, mainService, flickrFactory, $localStorage, filterFilter, ga) {
		var page = new entry.CreatePage($scope, mainService, flickrFactory, $localStorage, 'flickr', '', ga);
		page.removeClassElement = "#header";
		page.addClassElement = "article h1";

		page.latestUpdated = flickr[0].updated;
		if($scope.$storage.flickr) page.storageUpdated = $scope.$storage.flickr[0].dateuploaded;
		page.setClass();
		page.load();
	}
}

export class Illust {
  constructor($scope, mainService, pixivFactory, $localStorage, filterFilter, ga) {
		var page = new entry.CreatePage($scope, mainService, pixivFactory, $localStorage, 'pixiv', '', ga);
		page.removeClassElement = "#header";
		page.addClassElement = "article h1";

		$scope.$storage.pixiv = pixiv;
		page.latestUpdated = pixiv[0].updated;
		if($scope.$storage.pixiv) page.storageUpdated = $scope.$storage.pixiv[0].updated;
		page.setClass();
		page.load();
	}
}

export class Diary {
	constructor($scope, mainService, tumblrFactory, $localStorage, ga) {
		var page = new entry.CreatePage($scope, mainService, tumblrFactory, $localStorage, 'tumblr', '', ga);
		page.removeClassElement = "#header";
		page.addClassElement = "article h1";

		page.latestUpdated = tumblr[0].updated;
		if($scope.$storage.tumblr) page.storageUpdated = parseInt($scope.$storage.tumblr[0].timestamp);
		page.setClass();
		page.load();
	}
}

export class Weblog {
  constructor($scope, mainService, qiitaFactory, $localStorage, ga) {
		var page = new entry.CreatePage($scope, mainService, qiitaFactory, $localStorage, 'qiita', '', ga);
		page.removeClassElement = "#header";
		page.addClassElement = "article h1";

		page.latestUpdated = qiita[0].updated;
		if($scope.$storage.qiita) page.storageUpdated = Date.parse($scope.$storage.qiita[0].updated_at.replace(/-/g, '/'));
		page.setClass();
		page.load();
  }
}

export class Entry {
  constructor($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga) {
		var currentPage: string = location.pathname.split('/').pop();
		var page = new entry.CreatePage($scope, mainService, qiitaFactory, $localStorage, 'qiita', filterFilter, ga);
		page.addClassElement = "#header";

		page.latestUpdated = filterFilter(qiita, {uuid: currentPage})[0].updated;
		if($scope.$storage.qiita) page.storageUpdated = Date.parse(filterFilter($scope.$storage.qiita, {uuid: currentPage})[0].updated_at.replace(/-/g, '/'));
		page.setClass();
		page.load();

    angular.element(document).ready(() => {
    	mainService.CreatePageNav($scope);
			$scope.$apply();

			angular.element(document.querySelectorAll("pre")).addClass('prettyprint');
			prettify.prettyPrint();
    });
  }
}
export class TumblrEntry {
	constructor($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga) {
		var currentPage: string = location.pathname.split('/').pop();
		var page = new entry.CreatePage($scope, mainService, tumblrFactory, $localStorage, 'tumblr', filterFilter, ga);
		page.addClassElement = "#header";

		page.latestUpdated = filterFilter(tumblr, {uuid: currentPage})[0].updated;
		if($scope.$storage.tumblr) page.storageUpdated = parseInt(filterFilter($scope.$storage.tumblr, {id: currentPage})[0].timestamp);
		page.setClass();
		page.load();
		$.colorbox.close();

		angular.element(document).ready(() => {
			mainService.CreatePageNav($scope);
			$scope.$apply();

			angular.element(document.querySelectorAll("pre")).addClass('prettyprint');
			prettify.prettyPrint();
		});
	}
}

export class Tag {
  constructor($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga) {
		var page = new entry.CreatePage($scope, mainService, qiitaFactory, $localStorage, 'qiita', filterFilter, ga);
		page.removeClassElement = "#header";
		page.addClassElement = "article h1";
		page.latestUpdated = qiita[0].updated;
		if($scope.$storage.qiita) page.storageUpdated = Date.parse($scope.$storage.qiita[0].updated_at.replace(/-/g, '/'));
		page.setClass();
		page.load();
  }
}
export class TumblrTag {
	constructor($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga) {
		var page = new entry.CreatePage($scope, mainService, tumblrFactory, $localStorage, 'tumblr', filterFilter, ga);
		page.removeClassElement = "#header";
		page.addClassElement = "article h1";
		page.latestUpdated = tumblr[0].updated;
		if($scope.$storage.tumblr) page.storageUpdated = $scope.$storage.tumblr[0].timestamp;
		page.setClass();
		page.load();
	}
}
export class Design {
	constructor($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga) {
		var page = new entry.CreatePage($scope, mainService, tumblrFactory, $localStorage, 'tumblr', '', ga);
		page.removeClassElement = "#header";
		page.addClassElement = "article h1";
		page.latestUpdated = tumblr[0].updated;
		if($scope.$storage.tumblr) page.storageUpdated = $scope.$storage.tumblr[0].timestamp;
		page.setClass();

		if($scope.$storage.tumblr !== '' ? page.latestUpdated <= page.storageUpdated : false) {
			$scope.showLoading = false;
			$scope.items = tumblrFactory.getPhotos($scope.$storage.tumblr);
		} else {
			tumblrFactory.getItems().then((res) => {
				$scope.showLoading = false;
				$scope.$storage.tumblr = res.data.response.posts;
				$scope.items = tumblrFactory.getPhotos($scope.$storage.tumblr);
			},(status) => {
				$scope.showLoading = false;
				$scope.showErrorMessage = true;
			});
		}
	}
}


module entry {
	export class CreatePage {
		public removeClassElement: string;
		public addClassElement: string;
		public item;
		public latestUpdated;
		public storageUpdated;
		constructor(private $scope, mainService, private factory, private $localStorage, private name, private filterFilter, ga) {
			$scope.$storage = $localStorage.$default({
				qiita: '',
				flickr: '',
				pixiv: pixiv,
				tumblr: ''
			});

			ga('send', 'pageview');

			angular.element(document).ready(() => {
				mainService.ChangeTitle();
				mainService.LoadSns();
			});
			$scope.showLoading = true;
			$scope.showErrorMessage = false;
		}

		public setClass(): void {
			if(this.removeClassElement) angular.element(document.querySelectorAll(this.removeClassElement)).removeClass("off");
			if(this.addClassElement) angular.element(document.querySelectorAll(this.addClassElement)).addClass("off");
		}

		public load(): void {
			if(this.$scope.$storage[this.name] !== '' ? this.latestUpdated <= this.storageUpdated : false) {
				CreatePage.scopeSetting(this.$scope, this.factory, this.filterFilter, this.name, this.$scope.$storage[this.name]);
			} else {
				CreatePage[this.name](this.$scope, this.factory, this.filterFilter, this.name);
			}
		}

		static tumblr($scope, factory, filterFilter, name, items): void {
			factory.getItems().then((res) => {
				console.log(res.data);
				$scope.$storage[name] = res.data.response.posts;

				CreatePage.scopeSetting($scope, factory, filterFilter, name, res.data.response.posts);
			},(status) => {
				$scope.showLoading = false;
				$scope.showErrorMessage = true;
			});
		}
		static qiita($scope, factory, filterFilter, name, items): void {
			factory.getItems().then((res) => {
				$scope.$storage[name] = res.data;

				CreatePage.scopeSetting($scope, factory, filterFilter, name, res.data);
			},(status) => {
				$scope.showLoading = false;
				$scope.showErrorMessage = true;
			});
		}
		static flickr($scope, factory, filterFilter, name): void {
			var MAX = 100;
			var items = [];
			factory.getItems().then((res) => {
				res.data.photos.photo.forEach(function(photo) {
					factory.getItemsInfo(photo.id).then((res) => {
						items.push(res.data.photo);
						if(items.length === MAX) {
							items.sort(function(a, b){
								var x = a.dateuploaded;
								var y = b.dateuploaded;
								if (x < y) return 1;
								if (x > y) return -1;
								return 0;
							});

							$scope.$storage.flickr = items;
							CreatePage.scopeSetting($scope, factory, filterFilter, name, items);
							$scope.showLoading = false;
						}
					});
				});
			},(status) => {
				$scope.showLoading = false;
				$scope.showErrorMessage = true;
			});
		}

		static scopeSetting($scope, factory, filterFilter, name, items): void {
			var currentPage = decodeURIComponent(location.pathname.split('/').pop());
			$scope.currentPage = currentPage;
			$scope.items = filterFilter ? filterFilter(items, {tags: currentPage}) : items;
			if(filterFilter) $scope.item = !!items[0].uuid ? filterFilter(items, {uuid: currentPage})[0] : filterFilter(items, {id: currentPage})[0];
			$scope.tags = factory.getTags($scope.$storage[name]);
			$scope.showLoading = false;
		}
	};
}