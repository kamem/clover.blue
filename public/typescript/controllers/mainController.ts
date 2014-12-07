/// <reference path="../typings/tsd.d.ts" />
declare var qiita;

import app = require('app');

app.controller('cloverController', ['$scope', 'qiitaFactory', '$localStorage',
function($scope, qiitaFactory, $localStorage) {
		$scope.$storage = $localStorage.$default({
			qiita: ''
		});

		$scope.showLoading = true;

		if($scope.$storage.qiita !== '' ? (qiita[0].updated_at !== $scope.$storage.qiita[0].updated_at) : false) {
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
