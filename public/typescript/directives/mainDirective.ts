/// <reference path="../typings/tsd.d.ts" />
'use strict';

declare var twttr;
declare var FB;
declare var gapi;

import app = require('app');

app.directive('sns', () => {
	return {
		restrict: 'E',
		templateUrl: '/template/sns'
	};
});


app.directive('colorbox', function() {
	return {
		restrict: 'AC',
		link: function (scope, element, attrs) {
			$(element).colorbox(attrs.colorbox);
		}
	};
});