/// <reference path="typings/tsd.d.ts" />
'use strict';
require.config({
    paths: {
        jquery: 'components/jquery/dist/jquery',
        prettify: 'components/google-code-prettify/src/prettify',
        ga: 'components/angular-ga/ga',
        colorbox: 'components/colorbox/jquery.colorbox',
        kerning: 'components/jquery.kerning/dist/jquery.kerning',
        angular: 'components/angular/angular.min',
        ngStorage: 'components/ngstorage/ngStorage',
        ngRoute: 'components/angular-route/angular-route',
        ngSanitize: 'components/angular-sanitize/angular-sanitize'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        colorbox: {
            exports: 'colorbox'
        },
        kerning: {
            exports: 'kerning'
        },
        prettify: {
            exports: 'prettify'
        },
        ga: {
            exports: 'ga'
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
    'jquery',
    'colorbox',
    'kerning',
    'ngStorage',
    'ngRoute',
    'ngSanitize',
    'prettify',
    'ga',
    'directives/mainDirective',
    'filter/mainFilter'
], function (angular) {
    angular.bootstrap(document, ['cloverblue']);
});
