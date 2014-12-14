/// <reference path="../typings/tsd.d.ts" />
declare var qiita;

import app = require('app');

app.controller('index', ['$scope', 'qiitaFactory', '$localStorage',
function($scope, qiitaFactory, $localStorage) {
		$scope.$storage = $localStorage.$default({
			qiita: ''
		});

		$scope.showLoading = true;

		if($scope.$storage.qiita !== '' ? (qiita[0].updated_at === $scope.$storage.qiita[0].updated_at) : false) {
			$scope.items = $scope.$storage.qiita;
			$scope.showLoading = false;
		} else {
			qiitaFactory.getQiitaData().then(function(res){
				$scope.$storage.qiita = res.data;
				$scope.items = res.data;
				$scope.showLoading = false;
			});
		}
	}
]);

app.controller('entry', ['$scope', 'qiitaFactory', '$localStorage', 'filterFilter',
function($scope, qiitaFactory, $localStorage, filterFilter) {
		$scope.$storage = $localStorage.$default({
			qiita: ''
		});

		var uuid: string = location.pathname.split('/').pop();
		var localStorageItem = filterFilter($scope.$storage.qiita, {uuid: uuid})[0];
		var qiitaItem = filterFilter(qiita, {uuid: uuid})[0];

		if($scope.$storage.qiita !== '' ? (qiitaItem.updated_at === localStorageItem.updated_at) : false) {
			$scope.item = localStorageItem;
			$scope.showLoading = false;
		} else {
			qiitaFactory.getQiitaData().then(function(res){
				var resItem = filterFilter(res, {uuid: uuid})[0];
				$scope.$storage.qiita = res.data;
				$scope.item = resItem;
				$scope.showLoading = false;
			});
		}
	}
]);

app.filter('tree', function() {
  return function(str) {
    return str.match(/<[hH][1-3].*?>/g);
  };
});
