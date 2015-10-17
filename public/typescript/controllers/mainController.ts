/// <reference path="../typings/tsd.d.ts" />
'use strict';

declare var qiita;
declare var flickr;
declare var pixiv;
declare var tumblr;
var loadContentCount: number = 0;

import prettify = require('prettify');
import kerning = require('kerning');

export class Normal {
  constructor($scope, mainService, ga, $timeout) {
    angular.element(document.querySelectorAll("#header")).addClass("off");
		ga('send', 'pageview');


		$timeout(function() {
			mainService.CreatePageNav($scope);
			$scope.$apply();
			mainService.ChangeTitle();
			mainService.LoadSns();
			mainService.PageKerning();
		});
  }
}

export class Index {
  constructor($scope, mainService, qiitaFactory, tumblrFactory, pixivFactory, flickrFactory, $localStorage, ga) {
		//weblog
		var qiitaCategory = new entry.CreatePage($scope, mainService, qiitaFactory, $localStorage, 'qiita', '', ga);
		qiitaCategory.removeClassElement = "#header";
		qiitaCategory.addClassElement = "article h1";

		qiitaCategory.latestUpdated = qiita[0].updated;
		if($scope.$storage.qiita) qiitaCategory.storageUpdated = Date.parse($scope.$storage.qiita[0].updated_at.replace(/-/g, '/'));
		qiitaCategory.setClass();
		qiitaCategory.load();

		//diary
		var tumblrCategory = new entry.CreatePage($scope, mainService, tumblrFactory, $localStorage, 'tumblr', '', ga);
		tumblrCategory.latestUpdated = tumblr[0].updated;
		if($scope.$storage.tumblr) tumblrCategory.storageUpdated = parseInt($scope.$storage.tumblr[0].timestamp);
		tumblrCategory.load();

		//illust
		var pixivCategory = new entry.CreatePage($scope, mainService, pixivFactory, $localStorage, 'pixiv', '', ga);
		$scope.$storage.pixiv = pixiv;
		pixivCategory.latestUpdated = pixiv[0].updated;
		if($scope.$storage.pixiv) pixivCategory.storageUpdated = $scope.$storage.pixiv[0].updated;
		pixivCategory.load();

		//photos
		var flickrCategory = new entry.CreatePage($scope, mainService, flickrFactory, $localStorage, 'flickr', '', ga);
		flickrCategory.latestUpdated = flickr[0].updated;
		if($scope.$storage.flickr) flickrCategory.storageUpdated = $scope.$storage.flickr[0].dateuploaded;
		flickrCategory.load();

		//Design
		var name = 'tumblrDesign';
		if($scope.$storage.tumblr) tumblrCategory.storageUpdated = $scope.$storage.tumblr[0].timestamp;
		$scope[name] = {};
		if($scope.$storage.tumblr !== '' ? tumblrCategory.latestUpdated <= tumblrCategory.storageUpdated : false) {
			$scope[name].showLoading = false;
			$scope[name].items = tumblrFactory.getPhotos($scope.$storage.tumblr);
		} else {
			tumblrFactory.getItems().then((res) => {
				$scope[name].showLoading = false;
				$scope.$storage.tumblr = res.data.response.posts;
				$scope[name].items = tumblrFactory.getPhotos($scope.$storage.tumblr);
			},(status) => {
				$scope[name].showLoading = false;
				$scope[name].showErrorMessage = true;
			});
		}
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
  constructor($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga, $timeout) {
		var currentPage: string = location.pathname.split('/').pop();
		var page = new entry.CreatePage($scope, mainService, qiitaFactory, $localStorage, 'qiita', filterFilter, ga);
		page.addClassElement = "#header";

		page.latestUpdated = filterFilter(qiita, {uuid: currentPage})[0].updated;
		if($scope.$storage.qiita) page.storageUpdated = Date.parse(filterFilter($scope.$storage.qiita, {uuid: currentPage})[0].updated_at.replace(/-/g, '/'));
		page.setClass();
		page.load();
		$scope.$watch('qiita.item', function() {
			$timeout(function() {
				mainService.CreatePageNav($scope);
				mainService.PageKerning();
				angular.element(document.querySelectorAll("pre")).addClass('prettyprint');
				prettify.prettyPrint();
			});
		});
  }
}
export class TumblrEntry {
	constructor($scope, mainService, tumblrFactory, $localStorage, filterFilter, ga, $timeout) {
		var currentPage: string = location.pathname.split('/').pop();
		var page = new entry.CreatePage($scope, mainService, tumblrFactory, $localStorage, 'tumblr', filterFilter, ga);
		page.addClassElement = "#header";

		page.latestUpdated = filterFilter(tumblr, {uuid: currentPage})[0].updated;
		if($scope.$storage.tumblr) page.storageUpdated = parseInt(filterFilter($scope.$storage.tumblr, {id: currentPage})[0].timestamp);
		page.setClass();
		page.load();
		$.colorbox.close();
		$scope.$watch('tumblr.item', function() {
			$timeout(function() {
				mainService.CreatePageNav($scope);
				mainService.PageKerning();
				angular.element(document.querySelectorAll("pre")).addClass('prettyprint');
				prettify.prettyPrint();
			});
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
		var name = 'tumblr';
		var page = new entry.CreatePage($scope, mainService, tumblrFactory, $localStorage, name, '', ga);
		page.removeClassElement = "#header";
		page.addClassElement = "article h1";
		page.latestUpdated = tumblr[0].updated;
		if($scope.$storage.tumblr) page.storageUpdated = $scope.$storage.tumblr[0].timestamp;
		page.setClass();

		if($scope.$storage.tumblr !== '' ? page.latestUpdated <= page.storageUpdated : false) {
			$scope[name].showLoading = false;
			$scope[name].items = tumblrFactory.getPhotos($scope.$storage.tumblr);
		} else {
			tumblrFactory.getItems().then((res) => {
				$scope[name].showLoading = false;
				$scope.$storage.tumblr = res.data.response.posts;
				$scope[name].items = tumblrFactory.getPhotos($scope.$storage.tumblr);
			},(status) => {
				$scope[name].showLoading = false;
				$scope[name].showErrorMessage = true;
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

			this.$scope[this.name] = {};
			ga('send', 'pageview');

			angular.element(document).ready(() => {
				mainService.ChangeTitle();
				mainService.LoadSns();
			});
			this.$scope[this.name].showLoading = true;
			this.$scope[this.name].showErrorMessage = false;
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
				$scope.$storage[name] = res.data.response.posts;

				CreatePage.scopeSetting($scope, factory, filterFilter, name, res.data.response.posts);
			},(status) => {
				$scope[name].showLoading = false;
				$scope[name].showErrorMessage = true;
			});
		}
		static qiita($scope, factory, filterFilter, name, items): void {
			factory.getItems().then((res) => {
				$scope.$storage[name] = res.data;

				CreatePage.scopeSetting($scope, factory, filterFilter, name, res.data);
			},(status) => {
				$scope[name].showLoading = false;
				$scope[name].showErrorMessage = true;
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
							$scope[name].showLoading = false;
						}
					});
				});
			},(status) => {
				$scope[name].showLoading = false;
				$scope[name].showErrorMessage = true;
			});
		}

		static scopeSetting($scope, factory, filterFilter, name, items): void {
			var currentPage = decodeURIComponent(location.pathname.split('/').pop());
			$scope.currentPage = currentPage;
			$scope[name].items = filterFilter ? filterFilter(items, {tags: currentPage}) : items;
			if(filterFilter) $scope[name].item = !!items[0].uuid ? filterFilter(items, {uuid: currentPage})[0] : filterFilter(items, {id: currentPage})[0];
			$scope[name].tags = factory.getTags($scope.$storage[name]);
			$scope[name].showLoading = false;


			loadContentCount++;
			var $op = angular.element(document.querySelectorAll('.op'));

			if(!$op.hasClass('end')) {
				$op.addClass('parcent' + loadContentCount);
			}

			if(loadContentCount === 4) {
				$op.addClass('end');
			}
		}
	};
}