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
    var Photo = (function () {
        function Photo($scope, flickrFactory, $localStorage, filterFilter) {
            var page = new entry.CreatePage($scope, flickrFactory, $localStorage, 'flickr', '');
            page.removeClassElement = "#header";
            page.addClassElement = "article h1";
            page.latestUpdated = flickr[0].updated;
            if ($scope.$storage.flickr)
                page.storageUpdated = $scope.$storage.flickr[0].dateuploaded;
            page.load();
        }
        return Photo;
    })();
    exports.Photo = Photo;
    var Index = (function () {
        function Index($scope, qiitaFactory, $localStorage) {
            var page = new entry.CreatePage($scope, qiitaFactory, $localStorage, 'qiita', '');
            page.removeClassElement = "#header";
            page.addClassElement = "article h1";
            page.latestUpdated = qiita[0].updated;
            if ($scope.$storage.qiita)
                page.storageUpdated = Date.parse($scope.$storage.qiita[0].updated_at.replace(/-/g, '/'));
            page.load();
        }
        return Index;
    })();
    exports.Index = Index;
    var Entry = (function () {
        function Entry($scope, qiitaFactory, $localStorage, filterFilter, mainService) {
            var currentPage = location.pathname.split('/').pop();
            var page = new entry.CreatePage($scope, qiitaFactory, $localStorage, 'qiita', filterFilter);
            page.addClassElement = "#header";
            page.latestUpdated = filterFilter(qiita, { uuid: currentPage })[0].updated;
            if ($scope.$storage.qiita)
                page.storageUpdated = Date.parse(filterFilter($scope.$storage.qiita, { uuid: currentPage })[0].updated_at.replace(/-/g, '/'));
            page.load();
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
            var page = new entry.CreatePage($scope, qiitaFactory, $localStorage, 'qiita', filterFilter);
            page.removeClassElement = "#header";
            page.addClassElement = "article h1";
            page.latestUpdated = qiita[0].updated;
            if ($scope.$storage.qiita)
                page.storageUpdated = Date.parse($scope.$storage.qiita[0].updated_at.replace(/-/g, '/'));
            page.load();
        }
        return Tag;
    })();
    exports.Tag = Tag;
    var entry;
    (function (entry) {
        var CreatePage = (function () {
            function CreatePage($scope, factory, $localStorage, name, filterFilter) {
                this.$scope = $scope;
                this.factory = factory;
                this.$localStorage = $localStorage;
                this.name = name;
                this.filterFilter = filterFilter;
                $scope.$storage = $localStorage.$default({
                    qiita: '',
                    flickr: ''
                });
            }
            CreatePage.prototype.load = function () {
                if (this.removeClassElement)
                    angular.element(document.querySelectorAll(this.removeClassElement)).removeClass("off");
                if (this.addClassElement)
                    angular.element(document.querySelectorAll(this.addClassElement)).addClass("off");
                var $scope = this.$scope;
                var filterFilter = this.filterFilter;
                var factory = this.factory;
                $scope.showLoading = true;
                $scope.showErrorMessage = false;
                if ($scope.$storage[this.name] !== '' ? this.latestUpdated <= this.storageUpdated : false) {
                    CreatePage.scopeSetting($scope, factory, filterFilter, this.name, $scope.$storage[this.name]);
                }
                else {
                    CreatePage[this.name]($scope, factory, filterFilter, this.name);
                }
            };
            CreatePage.qiita = function ($scope, factory, filterFilter, name, items) {
                factory.getItems().then(function (res) {
                    $scope.$storage[name] = res.data;
                    CreatePage.scopeSetting($scope, factory, filterFilter, name, res.data);
                }, function (status) {
                    $scope.showLoading = false;
                    $scope.showErrorMessage = true;
                });
            };
            CreatePage.flickr = function ($scope, factory, filterFilter, name) {
                var items = [];
                factory.getItems().then(function (res) {
                    res.data.photos.photo.forEach(function (photo) {
                        factory.getItemsInfo(photo.id).then(function (res) {
                            items.push(res.data.photo);
                            $scope.$storage.flickr = items;
                            CreatePage.scopeSetting($scope, factory, filterFilter, name, items);
                        });
                        $scope.showLoading = false;
                    });
                }, function (status) {
                    $scope.showLoading = false;
                    $scope.showErrorMessage = true;
                });
            };
            CreatePage.scopeSetting = function ($scope, factory, filterFilter, name, items) {
                var currentPage = location.pathname.split('/').pop();
                $scope.items = filterFilter ? filterFilter(items, { tags: currentPage }) : items;
                if (filterFilter)
                    $scope.item = filterFilter(items, { uuid: currentPage })[0];
                $scope.tags = factory.getTags($scope.$storage[name]);
                $scope.showLoading = false;
            };
            return CreatePage;
        })();
        entry.CreatePage = CreatePage;
        ;
    })(entry || (entry = {}));
});
