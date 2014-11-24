/// <reference path="../typings/tsd.d.ts" />

import app = require('app');

app.directive('cloverController', ['$timeout', function($timeout) {
	return function (scope, elem, attrs) {
		scope.$watch(attrs.todoFocus, function (newval) {
		});
	};
}]);