/// <reference path="../typings/tsd.d.ts" />
'use strict';
define(["require", "exports"], function (require, exports) {
    var mainService = (function () {
        function mainService() {
        }
        mainService.prototype.CreatePageNav = function ($scope) {
            var $h = angular.element(document.querySelectorAll("h2:not(.pageNav)"));
            angular.forEach($h, function (ele, i) {
                ele.id = "2-" + (i + 1);
            });
            $scope.pageHeadingElement = $h;
        };
        mainService.prototype.ChangeTitle = function () {
            var title = decodeURI(angular.element(document.querySelectorAll("main h1")).text()) + ' - clover.blue';
            angular.element(document.querySelectorAll("title")).text(title);
        };
        mainService.prototype.PageKerning = function () {
            $('h1,.content h2,.content h3,.content h4,.content li,.content p').kerning();
        };
        mainService.prototype.LoadSns = function () {
            angular.element(document).ready(function () {
                //twitter
                if (typeof twttr !== 'undefined') {
                    var $tweetButton = angular.element(document.querySelectorAll(".twitter-share-button"));
                    $tweetButton.attr('data-url', document.location.href);
                    $tweetButton.attr('data-text', document.title);
                    twttr.widgets.load();
                }
                ;
                //facebook
                if (typeof FB !== 'undefined') {
                    var ele = angular.element(document.querySelectorAll(".facebookLikelike"))[0];
                    FB.XFBML.parse(ele);
                }
                ;
                //google
                if (typeof gapi !== 'undefined') {
                    var ele = angular.element(document.querySelectorAll(".g-plusone"))[0];
                    gapi.plusone.render(ele, { size: "medium", width: "120px" });
                }
                ;
            });
        };
        return mainService;
    })();
    exports.mainService = mainService;
});
