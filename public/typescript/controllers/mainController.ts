/// <reference path="../typings/tsd.d.ts" />
'use strict';

declare var qiita;

import prettify = require('prettify');

export class Normal {
  constructor() {
    angular.element(document.querySelectorAll("#header")).addClass("off");
  }
}

export class Index {
  constructor($scope, qiitaFactory, $localStorage) {
		var qiitaEntry = new entry.Qiita($scope, qiitaFactory, $localStorage, '');
		qiitaEntry.removeClassElement = "#header";
		qiitaEntry.addClassElement = "article h1";
		qiitaEntry.qiitaItem = qiita[0];
		qiitaEntry.storageItem = $scope.$storage.qiita[0];
		qiitaEntry.load();
  }
}

export class Entry {
  constructor($scope, qiitaFactory, $localStorage, filterFilter) {
		var currentPage: string = location.pathname.split('/').pop();
		var qiitaEntry = new entry.Qiita($scope, qiitaFactory, $localStorage, filterFilter);
		qiitaEntry.addClassElement = "#header";
		qiitaEntry.qiitaItem = filterFilter(qiita, {uuid: currentPage})[0];
		qiitaEntry.storageItem = filterFilter($scope.$storage.qiita, {uuid: currentPage})[0];
		qiitaEntry.load();

    angular.element(document).ready(function () {
			angular.element(document.querySelectorAll("pre")).addClass('prettyprint');
			prettify.prettyPrint();
    });
  }
}

export class Tag {
  constructor($scope, qiitaFactory, $localStorage, filterFilter) {
		var currentPage: string = location.pathname.split('/').pop();
		var qiitaEntry = new entry.Qiita($scope, qiitaFactory, $localStorage, filterFilter);
		qiitaEntry.removeClassElement = "#header";
		qiitaEntry.addClassElement = "article h1";
		qiitaEntry.qiitaItem = qiita[0];
		qiitaEntry.storageItem = $scope.$storage.qiita[0];
		qiitaEntry.load();
  }
}


module entry {
	export class Qiita {
		public removeClassElement: string;
		public addClassElement: string;
		public qiitaItem;
		public storageItem;
		constructor(private $scope, private qiitaFactory, private $localStorage, private filterFilter) {
			$scope.$storage = $localStorage.$default({
				qiita: ''
			});
		}
		public load() {
			if(this.removeClassElement) angular.element(document.querySelectorAll(this.removeClassElement)).removeClass("off");
			if(this.addClassElement) angular.element(document.querySelectorAll(this.addClassElement)).addClass("off");

			var $scope = this.$scope;
			var filterFilter = this.filterFilter;
			var qiitaFactory = this.qiitaFactory;

			$scope.showLoading = true;
			$scope.showErrorMessage = false;
			if($scope.$storage.qiita !== '' ? (this.qiitaItem.updated <= Date.parse(this.storageItem.updated_at.replace(/-/g, '/'))) : false) {
				Qiita.scopeSetting($scope, qiitaFactory, filterFilter, $scope.$storage.qiita);
			} else {
				qiitaFactory.getQiitaItems().then((res) => {
					$scope.$storage.qiita = res.data;

					Qiita.scopeSetting($scope, qiitaFactory, filterFilter, res.data);
				},(status) => {
					$scope.showLoading = false;
					$scope.showErrorMessage = true;
				});
			}
		}

		static scopeSetting($scope, qiitaFactory, filterFilter, items) {
			var currentPage = location.pathname.split('/').pop();
			$scope.items = filterFilter ? filterFilter(items, {tags: currentPage}) : items;
			if(filterFilter) $scope.item = filterFilter(items, {uuid: currentPage})[0];
			$scope.tags = qiitaFactory.getQiitaTags($scope.$storage.qiita);
			$scope.showLoading = false;
		}
	};
}