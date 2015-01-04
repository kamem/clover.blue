/// <reference path="../typings/tsd.d.ts" />
'use strict';
define(["require", "exports", 'prettify'], function (require, exports, prettify) {
    var Normal = (function () {
        function Normal($scope, mainService, ga) {
            angular.element(document.querySelectorAll("#header")).addClass("off");
            angular.element(document).ready(function () {
                mainService.CreatePageNav($scope);
                $scope.$apply();
                mainService.ChangeTitle();
                mainService.LoadSns();
            });
        }
        return Normal;
    })();
    exports.Normal = Normal;
    var Index = (function () {
        function Index($scope, mainService, qiitaFactory, $localStorage, ga) {
            var page = new entry.CreatePage($scope, qiitaFactory, $localStorage, 'qiita', '');
            page.removeClassElement = "#header";
            page.addClassElement = "article h1";
            page.latestUpdated = qiita[0].updated;
            if ($scope.$storage.qiita)
                page.storageUpdated = Date.parse($scope.$storage.qiita[0].updated_at.replace(/-/g, '/'));
            page.load();
            ga('send', 'pageview');
            angular.element(document).ready(function () {
                mainService.ChangeTitle();
                mainService.LoadSns();
            });
        }
        return Index;
    })();
    exports.Index = Index;
    var Photo = (function () {
        function Photo($scope, mainService, flickrFactory, $localStorage, filterFilter, ga) {
            var page = new entry.CreatePage($scope, flickrFactory, $localStorage, 'flickr', '');
            page.removeClassElement = "#header";
            page.addClassElement = "article h1";
            page.latestUpdated = flickr[0].updated;
            if ($scope.$storage.flickr)
                page.storageUpdated = $scope.$storage.flickr[0].dateuploaded;
            page.load();
            ga('send', 'pageview');
            angular.element(document).ready(function () {
                mainService.ChangeTitle();
                mainService.LoadSns();
            });
        }
        return Photo;
    })();
    exports.Photo = Photo;
    var Illust = (function () {
        function Illust($scope, mainService, pixivFactory, $localStorage, filterFilter, ga) {
            var page = new entry.CreatePage($scope, pixivFactory, $localStorage, 'pixiv', '');
            page.removeClassElement = "#header";
            page.addClassElement = "article h1";
            $scope.$storage.pixiv = pixiv;
            page.latestUpdated = pixiv[0].updated;
            if ($scope.$storage.pixiv)
                page.storageUpdated = $scope.$storage.pixiv[0].updated;
            page.load();
            ga('send', 'pageview');
            angular.element(document).ready(function () {
                mainService.ChangeTitle();
                mainService.LoadSns();
            });
        }
        return Illust;
    })();
    exports.Illust = Illust;
    var Weblog = (function () {
        function Weblog($scope, mainService, qiitaFactory, $localStorage, ga) {
            var page = new entry.CreatePage($scope, qiitaFactory, $localStorage, 'qiita', '');
            page.removeClassElement = "#header";
            page.addClassElement = "article h1";
            page.latestUpdated = qiita[0].updated;
            if ($scope.$storage.qiita)
                page.storageUpdated = Date.parse($scope.$storage.qiita[0].updated_at.replace(/-/g, '/'));
            page.load();
            ga('send', 'pageview');
            angular.element(document).ready(function () {
                mainService.ChangeTitle();
                mainService.LoadSns();
            });
        }
        return Weblog;
    })();
    exports.Weblog = Weblog;
    var Entry = (function () {
        function Entry($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga) {
            var currentPage = location.pathname.split('/').pop();
            var page = new entry.CreatePage($scope, qiitaFactory, $localStorage, 'qiita', filterFilter);
            page.addClassElement = "#header";
            page.latestUpdated = filterFilter(qiita, { uuid: currentPage })[0].updated;
            if ($scope.$storage.qiita)
                page.storageUpdated = Date.parse(filterFilter($scope.$storage.qiita, { uuid: currentPage })[0].updated_at.replace(/-/g, '/'));
            page.load();
            ga('send', 'pageview');
            angular.element(document).ready(function () {
                mainService.CreatePageNav($scope);
                $scope.$apply();
                mainService.ChangeTitle();
                mainService.LoadSns();
                angular.element(document.querySelectorAll("pre")).addClass('prettyprint');
                prettify.prettyPrint();
            });
        }
        return Entry;
    })();
    exports.Entry = Entry;
    var Tag = (function () {
        function Tag($scope, mainService, qiitaFactory, $localStorage, filterFilter, ga) {
            var currentPage = location.pathname.split('/').pop();
            var page = new entry.CreatePage($scope, qiitaFactory, $localStorage, 'qiita', filterFilter);
            page.removeClassElement = "#header";
            page.addClassElement = "article h1";
            page.latestUpdated = qiita[0].updated;
            if ($scope.$storage.qiita)
                page.storageUpdated = Date.parse($scope.$storage.qiita[0].updated_at.replace(/-/g, '/'));
            page.load();
            ga('send', 'pageview');
            angular.element(document).ready(function () {
                mainService.ChangeTitle();
                mainService.LoadSns();
            });
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
                    flickr: '',
                    pixiv: pixiv
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
                var MAX = 100;
                var items = [];
                factory.getItems().then(function (res) {
                    res.data.photos.photo.forEach(function (photo) {
                        factory.getItemsInfo(photo.id).then(function (res) {
                            items.push(res.data.photo);
                            if (items.length === MAX) {
                                items.sort(function (a, b) {
                                    var x = a.dateuploaded;
                                    var y = b.dateuploaded;
                                    if (x < y)
                                        return 1;
                                    if (x > y)
                                        return -1;
                                    return 0;
                                });
                                $scope.$storage.flickr = items;
                                CreatePage.scopeSetting($scope, factory, filterFilter, name, items);
                                $scope.showLoading = false;
                            }
                        });
                    });
                }, function (status) {
                    $scope.showLoading = false;
                    $scope.showErrorMessage = true;
                });
            };
            CreatePage.scopeSetting = function ($scope, factory, filterFilter, name, items) {
                var currentPage = location.pathname.split('/').pop();
                $scope.currentPage = currentPage;
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
