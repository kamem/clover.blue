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
        return mainService;
    })();
    exports.mainService = mainService;
});
