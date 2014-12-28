define(["require", "exports", 'prettify'], function (require, exports, prettify) {
    /// <reference path="../typings/tsd.d.ts" />
    var Normal = (function () {
        function Normal() {
            angular.element(document.querySelectorAll("#header")).addClass("off");
        }
        return Normal;
    })();
    exports.Normal = Normal;
    var Index = (function () {
        function Index($scope, qiitaFactory, $localStorage) {
            $scope.$storage = $localStorage.$default({
                qiita: ''
            });
            angular.element(document.querySelectorAll("#header")).removeClass("off");
            angular.element(document.querySelectorAll("article h1")).addClass("off");
            $scope.showLoading = true;
            if ($scope.$storage.qiita !== '' ? (qiita[0].updated <= Date.parse($scope.$storage.qiita[0].updated_at.replace(/-/g, '/'))) : false) {
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
        }
        return Index;
    })();
    exports.Index = Index;
    var Entry = (function () {
        function Entry($scope, qiitaFactory, $localStorage, filterFilter) {
            $scope.$storage = $localStorage.$default({
                qiita: ''
            });
            var currentPage = location.pathname.split('/').pop();
            var localStorageItem = filterFilter($scope.$storage.qiita, { uuid: currentPage })[0];
            var qiitaItem = filterFilter(qiita, { uuid: currentPage })[0];
            angular.element(document.querySelectorAll("#header")).addClass("off");
            $scope.showLoading = true;
            if ($scope.$storage.qiita !== '' ? (qiitaItem.updated <= Date.parse(localStorageItem.updated_at.replace(/-/g, '/'))) : false) {
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
            angular.element(document).ready(function () {
                angular.element(document.querySelectorAll("pre")).addClass('prettyprint');
                prettify.prettyPrint();
            });
        }
        return Entry;
    })();
    exports.Entry = Entry;
    var Tag = (function () {
        function Tag($scope, qiitaFactory, $localStorage, filterFilter) {
            $scope.$storage = $localStorage.$default({
                qiita: ''
            });
            var currentPage = decodeURIComponent(location.pathname.split('/').pop());
            var localStorageItem = filterFilter($scope.$storage.qiita, { tags: currentPage });
            angular.element(document.querySelectorAll("#header")).removeClass("off");
            angular.element(document.querySelectorAll("article h1")).addClass("off");
            $scope.currentPage = currentPage;
            $scope.showLoading = true;
            if ($scope.$storage.qiita !== '' ? (qiita[0].updated <= Date.parse($scope.$storage.qiita[0].updated_at.replace(/-/g, '/'))) : false) {
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
        }
        return Tag;
    })();
    exports.Tag = Tag;
});
