/// <reference path="../typings/tsd.d.ts" />
'use strict';

declare var qiita;
declare var flickr;
declare var pixiv;

import prettify = require('prettify');

export class Normal {
  constructor($scope, mainService, ga) {
    angular.element(document.querySelectorAll("#header")).addClass("off");

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
		var page = new entry.CreatePage($scope, qiitaFactory, $localStorage, 'qiita', '');
		page.removeClassElement = "#header";
		page.addClassElement = "article h1";

		page.latestUpdated = qiita[0].updated;
		if($scope.$storage.qiita) page.storageUpdated = Date.parse($scope.$storage.qiita[0].updated_at.replace(/-/g, '/'));
		page.load();

		ga('send', 'pageview');

		angular.element(document).ready(() => {
			mainService.ChangeTitle();
			mainService.LoadSns();
		});
  }
}

export class Photo {
  constructor($scope, mainService, flickrFactory, $localStorage, filterFilter, ga) {
		var page = new entry.CreatePage($scope, flickrFactory, $localStorage, 'flickr', '');
		page.removeClassElement = "#header";
		page.addClassElement = "article h1";

		page.latestUpdated = flickr[0].updated;
		if($scope.$storage.flickr) page.storageUpdated = $scope.$storage.flickr[0].dateuploaded;
		page.load();

		ga('send', 'pageview');

		angular.element(document).ready(() => {
			mainService.ChangeTitle();
			mainService.LoadSns();
		});
	}
}

export class Illust {
  constructor($scope, mainService, pixivFactory, $localStorage, filterFilter, ga) {
		var page = new entry.CreatePage($scope, pixivFactory, $localStorage, 'pixiv', '');
		page.removeClassElement = "#header";
		page.addClassElement = "article h1";

		$scope.$storage.pixiv = pixiv;
		page.latestUpdated = pixiv[0].updated;
		if($scope.$storage.pixiv) page.storageUpdated = $scope.$storage.pixiv[0].updated;
		page.load();

		ga('send', 'pageview');

		angular.element(document).ready(() => {
			mainService.ChangeTitle();
			mainService.LoadSns();
		});
	}
}

export class Weblog {
  constructor($scope, mainService, qiitaFactory, $localStorage, ga) {
		var page = new entry.CreatePage($scope, qiitaFactory, $localStorage, 'qiita', '');
		page.removeClassElement = "#header";
		page.addClassElement = "article h1";

		page.latestUpdated = qiita[0].updated;
		if($scope.$storage.qiita) page.storageUpdated = Date.parse($scope.$storage.qiita[0].updated_at.replace(/-/g, '/'));
		page.load();

		ga('send', 'pageview');

		angular.element(document).ready(() => {
			mainService.ChangeTitle();
			mainService.LoadSns();
		});
  }
}

export class Entry {
  constructor($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga) {
		var currentPage: string = location.pathname.split('/').pop();
		var page = new entry.CreatePage($scope, qiitaFactory, $localStorage, 'qiita', filterFilter);
		page.addClassElement = "#header";

		page.latestUpdated = filterFilter(qiita, {uuid: currentPage})[0].updated;
		if($scope.$storage.qiita) page.storageUpdated = Date.parse(filterFilter($scope.$storage.qiita, {uuid: currentPage})[0].updated_at.replace(/-/g, '/'));
		page.load();

		ga('send', 'pageview');

    angular.element(document).ready(() => {
    	mainService.CreatePageNav($scope);
			$scope.$apply();

			mainService.ChangeTitle();
			mainService.LoadSns();

			angular.element(document.querySelectorAll("pre")).addClass('prettyprint');
			prettify.prettyPrint();
    });
  }
}

export class Tag {
  constructor($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga) {
		var currentPage: string = location.pathname.split('/').pop();
		var page = new entry.CreatePage($scope, qiitaFactory, $localStorage, 'qiita', filterFilter);
		page.removeClassElement = "#header";
		page.addClassElement = "article h1";
		page.latestUpdated = qiita[0].updated;
		if($scope.$storage.qiita) page.storageUpdated = Date.parse($scope.$storage.qiita[0].updated_at.replace(/-/g, '/'));
		page.load();

		ga('send', 'pageview');

		angular.element(document).ready(() => {
			mainService.ChangeTitle();
			mainService.LoadSns();
		});
  }
}


module entry {
	export class CreatePage {
		public removeClassElement: string;
		public addClassElement: string;
		public item;
		public latestUpdated;
		public storageUpdated;
		constructor(private $scope, private factory, private $localStorage, private name, private filterFilter) {
			$scope.$storage = $localStorage.$default({
				qiita: '',
				flickr: '',
				pixiv: pixiv
			});
		}
		public load(): void {
			if(this.removeClassElement) angular.element(document.querySelectorAll(this.removeClassElement)).removeClass("off");
			if(this.addClassElement) angular.element(document.querySelectorAll(this.addClassElement)).addClass("off");

			var $scope = this.$scope;
			var filterFilter = this.filterFilter;
			var factory = this.factory;

			$scope.showLoading = true;
			$scope.showErrorMessage = false;

			if($scope.$storage[this.name] !== '' ? this.latestUpdated <= this.storageUpdated : false) {
				CreatePage.scopeSetting($scope, factory, filterFilter, this.name, $scope.$storage[this.name]);
			} else {
				CreatePage[this.name]($scope, factory, filterFilter, this.name);
			}
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
			var currentPage = location.pathname.split('/').pop();
			$scope.currentPage = currentPage;
			$scope.items = filterFilter ? filterFilter(items, {tags: currentPage}) : items;
			if(filterFilter) $scope.item = filterFilter(items, {uuid: currentPage})[0];
			$scope.tags = factory.getTags($scope.$storage[name]);
			$scope.showLoading = false;
		}
	};
}