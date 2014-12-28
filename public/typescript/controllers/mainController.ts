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
		public currentPage: string;
		public qiitaItem;
		public storageItem;

		private $scope;
		private qiitaFactory;
		private $localStorage;
		private filterFilter;
		constructor($scope, qiitaFactory, $localStorage, filterFilter) {
			$scope.$storage = $localStorage.$default({
				qiita: ''
			});
			this.$scope = $scope;
			this.qiitaFactory = qiitaFactory;
			this.$localStorage = $localStorage;
			this.filterFilter = filterFilter;
		}
		public load() {

			if(this.removeClassElement) angular.element(document.querySelectorAll(this.removeClassElement)).removeClass("off");
			if(this.addClassElement) angular.element(document.querySelectorAll(this.addClassElement)).addClass("off");

			this.currentPage = location.pathname.split('/').pop();

			this.$scope.showLoading = true;
			if(this.$scope.$storage.qiita !== '' ? (this.qiitaItem.updated <= Date.parse(this.storageItem.updated_at.replace(/-/g, '/'))) : false) {
				this.$scope.items = this.filterFilter ?
					this.filterFilter(this.$scope.$storage.qiita, {tags: this.currentPage}) : this.$scope.$storage.qiita;
				if(this.filterFilter) this.$scope.item = this.storageItem;
				this.$scope.tags = this.qiitaFactory.getQiitaTags(this.$scope.$storage.qiita);
				this.$scope.showLoading = false;
			} else {
				var _this = this;
				this.qiitaFactory.getQiitaItems().then(function(res){
					_this.$scope.$storage.qiita = res.data;
					_this.$scope.items = _this.filterFilter ? _this.filterFilter(res.data, {tags: _this.currentPage}) : res.data;
					if(_this.filterFilter) _this.$scope.item = _this.filterFilter(res.data, {uuid: _this.currentPage})[0];
					_this.$scope.tags = _this.qiitaFactory.getQiitaTags(_this.$scope.$storage.qiita);
					_this.$scope.showLoading = false;
				});
			}
		}
	};
}