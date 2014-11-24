/// <reference path="../typings/tsd.d.ts" />

import app = require('app');

return app.controller('cloverController', ['$scope', 'qiitaFactory',
	function($scope, qiitaFactory) {

    qiitaFactory.getQiitaData().then(function(res){
    	console.log(res.data);
        $scope.items = res.data;
        $scope.show_loading = false; // ローディング中、を非表示へ
      }
    );

    $scope.show_loading = true; // ローディング中、を表示
	}
]);
