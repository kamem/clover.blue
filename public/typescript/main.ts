/// <reference path="typings/tsd.d.ts" />
'use strict';

require.config({
	paths: {
		jquery: 'components/jquery/dist/jquery',
		prettify: 'components/google-code-prettify/src/prettify',

		angular: 'components/angular/angular.min',
    ngStorage: 'components/ngstorage/ngStorage',
    ngRoute: 'components/angular-route/angular-route',
    ngSanitize: 'components/angular-sanitize/angular-sanitize'
	},
	shim: {
		jquery: {
			exports: '$'
		},
		prettify: {
			exports: 'prettify'
		},

		angular: {
			exports: 'angular'
		},
		ngStorage: {
			exports: 'ngStorage'
		},
		ngRoute: {
			exports: 'ngRoute'
		},
		ngSanitize: {
			exports: 'ngSanitize'
		}
	}
});

require([
	'angular',
	'ngStorage',
	'ngRoute',
	'ngSanitize',
	'prettify',
	'filter/mainFilter'],
	function (angular) {
		angular.bootstrap(document, ['cloverblue']);
	}
);
