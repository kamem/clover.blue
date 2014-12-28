/// <reference path="../typings/tsd.d.ts" />
'use strict';

declare var qiita;

import app = require('app');

app.filter('dateParse', function() {
  return function(str) {
    return !!str ? Date.parse(str.replace(/-/g, '/')) : str;
  };
});

app.filter('tree', function() {
  return function(str) {
    return str.match(/<[hH][1-3].*?>/g);
  };
});
