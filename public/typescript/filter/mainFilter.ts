/// <reference path="../typings/tsd.d.ts" />
'use strict';

declare var qiita;

import app = require('app');

app.filter('dateParse', () => {
  return function(str) {
    return !!str ? Date.parse(str.replace(/-/g, '/')) : str;
  };
});
