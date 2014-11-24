/// <reference path="typings/tsd.d.ts" />
require.config({
    paths: {
        jquery: 'components/jquery/dist/jquery.min',
        angular: 'components/angular/angular.min'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        jquery: {
            exports: '$'
        }
    }
});

require([
    'angular',
    'factory/qiitaFactory',
    'directives/mainDirective',
    'controllers/mainController'], function (angular) {
    angular.bootstrap(document, ['cloverblue']);
});
