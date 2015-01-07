/// <reference path="../typings/tsd.d.ts" />
'use strict';

declare var qiita;

import app = require('app');

app.filter('dateParse', () => {
  return function(str) {
    return typeof str === 'string' ? Date.parse(str.replace(/-/g, '/')) :
      String(str).length < 13 ? parseInt(String(str) + '000') : str;
  };
});
