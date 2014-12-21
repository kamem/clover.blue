define(["require", "exports", 'app'], function (require, exports, app) {
    /// <reference path="../typings/tsd.d.ts" />
    app.controller('index', ['$scope', 'qiitaFactory', '$localStorage', function ($scope, qiitaFactory, $localStorage) {
        $scope.$storage = $localStorage.$default({
            qiita: ''
        });
        angular.element(document.querySelectorAll("#header")).removeClass("off");
        angular.element(document.querySelectorAll("article h1")).addClass("off");
        $scope.showLoading = true;
        if ($scope.$storage.qiita !== '' ? (qiita[0].updated <= Date.parse($scope.$storage.qiita[0].updated_at)) : false) {
            $scope.items = $scope.$storage.qiita;
            $scope.tags = qiitaFactory.getQiitaTags($scope.items);
            $scope.showLoading = false;
        }
        else {
            qiitaFactory.getQiitaItems().then(function (res) {
                $scope.$storage.qiita = res.data;
                $scope.items = res.data;
                $scope.tags = qiitaFactory.getQiitaTags($scope.items);
                $scope.showLoading = false;
            });
        }
    }]);
    app.controller('entry', ['$scope', 'qiitaFactory', '$localStorage', 'filterFilter', function ($scope, qiitaFactory, $localStorage, filterFilter) {
        $scope.$storage = $localStorage.$default({
            qiita: ''
        });
        var currentPage = location.pathname.split('/').pop();
        var localStorageItem = filterFilter($scope.$storage.qiita, { uuid: currentPage })[0];
        var qiitaItem = filterFilter(qiita, { uuid: currentPage })[0];
        angular.element(document.querySelectorAll("#header")).addClass("off");
        $scope.showLoading = true;
        if ($scope.$storage.qiita !== '' ? (qiitaItem.updated <= Date.parse(localStorageItem.updated_at)) : false) {
            $scope.item = localStorageItem;
            $scope.showLoading = false;
        }
        else {
            qiitaFactory.getQiitaItems().then(function (res) {
                var resItem = filterFilter(res.data, { uuid: currentPage })[0];
                $scope.$storage.qiita = res.data;
                $scope.item = resItem;
                $scope.showLoading = false;
            });
        }
    }]);
    app.controller('tag', ['$scope', 'qiitaFactory', '$localStorage', 'filterFilter', function ($scope, qiitaFactory, $localStorage, filterFilter) {
        $scope.$storage = $localStorage.$default({
            qiita: ''
        });
        var currentPage = decodeURIComponent(location.pathname.split('/').pop());
        var localStorageItem = filterFilter($scope.$storage.qiita, { tags: currentPage });
        angular.element(document.querySelectorAll("#header")).removeClass("off");
        angular.element(document.querySelectorAll("article h1")).addClass("off");
        $scope.currentPage = currentPage;
        $scope.showLoading = true;
        if ($scope.$storage.qiita !== '' ? (qiita[0].updated <= Date.parse($scope.$storage.qiita[0].updated_at)) : false) {
            $scope.items = localStorageItem;
            $scope.tags = qiitaFactory.getQiitaTags($scope.$storage.qiita);
            $scope.showLoading = false;
        }
        else {
            qiitaFactory.getQiitaItems().then(function (res) {
                var resItem = filterFilter(res.data, { tags: currentPage });
                $scope.$storage.qiita = res.data;
                $scope.items = resItem;
                $scope.tags = qiitaFactory.getQiitaTags($scope.$storage.qiita);
                $scope.showLoading = false;
            });
        }
    }]);
    app.filter('dateParse', function () {
        return function (str) {
            return Date.parse(str);
        };
    });
    app.filter('tree', function () {
        return function (str) {
            return str.match(/<[hH][1-3].*?>/g);
        };
    });
});
