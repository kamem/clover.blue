/// <reference path="../typings/tsd.d.ts" />
'use strict';
define(["require", "exports", 'prettify'], function (require, exports, prettify) {
    var Normal = (function () {
        function Normal($scope, mainService) {
            angular.element(document.querySelectorAll("#header")).addClass("off");
            angular.element(document).ready(function () {
                mainService.CreatePageNav($scope);
                $scope.$apply();
            });
        }
        return Normal;
    })();
    exports.Normal = Normal;
    var Index = (function () {
        function Index($scope, qiitaFactory, $localStorage) {
            var qiitaEntry = new entry.Qiita($scope, qiitaFactory, $localStorage, '');
            qiitaEntry.removeClassElement = "#header";
            qiitaEntry.addClassElement = "article h1";
            qiitaEntry.qiitaItem = qiita[0];
            qiitaEntry.storageItem = $scope.$storage.qiita[0];
            qiitaEntry.load();
        }
        return Index;
    })();
    exports.Index = Index;
    var Entry = (function () {
        function Entry($scope, qiitaFactory, $localStorage, filterFilter, mainService) {
            var currentPage = location.pathname.split('/').pop();
            var qiitaEntry = new entry.Qiita($scope, qiitaFactory, $localStorage, filterFilter);
            qiitaEntry.addClassElement = "#header";
            qiitaEntry.qiitaItem = filterFilter(qiita, { uuid: currentPage })[0];
            qiitaEntry.storageItem = filterFilter($scope.$storage.qiita, { uuid: currentPage })[0];
            qiitaEntry.load();
            angular.element(document).ready(function () {
                mainService.CreatePageNav($scope);
                $scope.$apply();
                angular.element(document.querySelectorAll("pre")).addClass('prettyprint');
                prettify.prettyPrint();
            });
        }
        return Entry;
    })();
    exports.Entry = Entry;
    var Tag = (function () {
        function Tag($scope, qiitaFactory, $localStorage, filterFilter) {
            var currentPage = location.pathname.split('/').pop();
            var qiitaEntry = new entry.Qiita($scope, qiitaFactory, $localStorage, filterFilter);
            qiitaEntry.removeClassElement = "#header";
            qiitaEntry.addClassElement = "article h1";
            qiitaEntry.qiitaItem = qiita[0];
            qiitaEntry.storageItem = $scope.$storage.qiita[0];
            qiitaEntry.load();
        }
        return Tag;
    })();
    exports.Tag = Tag;
    var entry;
    (function (entry) {
        var Qiita = (function () {
            function Qiita($scope, qiitaFactory, $localStorage, filterFilter) {
                this.$scope = $scope;
                this.qiitaFactory = qiitaFactory;
                this.$localStorage = $localStorage;
                this.filterFilter = filterFilter;
                $scope.$storage = $localStorage.$default({
                    qiita: ''
                });
            }
            Qiita.prototype.load = function () {
                if (this.removeClassElement)
                    angular.element(document.querySelectorAll(this.removeClassElement)).removeClass("off");
                if (this.addClassElement)
                    angular.element(document.querySelectorAll(this.addClassElement)).addClass("off");
                var $scope = this.$scope;
                var filterFilter = this.filterFilter;
                var qiitaFactory = this.qiitaFactory;
                $scope.showLoading = true;
                $scope.showErrorMessage = false;
                if ($scope.$storage.qiita !== '' ? (this.qiitaItem.updated <= Date.parse(this.storageItem.updated_at.replace(/-/g, '/'))) : false) {
                    Qiita.scopeSetting($scope, qiitaFactory, filterFilter, $scope.$storage.qiita);
                }
                else {
                    qiitaFactory.getQiitaItems().then(function (res) {
                        $scope.$storage.qiita = res.data;
                        Qiita.scopeSetting($scope, qiitaFactory, filterFilter, res.data);
                    }, function (status) {
                        $scope.showLoading = false;
                        $scope.showErrorMessage = true;
                    });
                }
            };
            Qiita.scopeSetting = function ($scope, qiitaFactory, filterFilter, items) {
                var currentPage = location.pathname.split('/').pop();
                $scope.items = filterFilter ? filterFilter(items, { tags: currentPage }) : items;
                if (filterFilter)
                    $scope.item = filterFilter(items, { uuid: currentPage })[0];
                $scope.tags = qiitaFactory.getQiitaTags($scope.$storage.qiita);
                $scope.showLoading = false;
            };
            return Qiita;
        })();
        entry.Qiita = Qiita;
        ;
    })(entry || (entry = {}));
});
