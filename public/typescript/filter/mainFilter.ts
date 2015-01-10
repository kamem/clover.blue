/// <reference path="../typings/tsd.d.ts" />
'use strict';

declare var qiita;

import app = require('app');

app.filter('dateParse', () => {
  return (str) => {
    return typeof str === 'string' ? Date.parse(str.replace(/-/g, '/')) :
      String(str).length < 13 ? parseInt(String(str) + '000') : str;
  };
});

app.filter('tumblrDomainReplace', () => {
  return (str): string => {
    var TUMBLR_DOMAIN = 'http://develo0.tumblr.com/';
    return str.replace(TUMBLR_DOMAIN, '');
  };
});

