/// <reference path="../typings/tsd.d.ts" />
'use strict';

export class mainService {
  public CreatePageNav($scope) {
  	var $h = angular.element(document.querySelectorAll("h2:not(.pageNav)"));
		$scope.pageHeadingElement = $h;
		angular.forEach($h,(ele, i) => {
			ele.id = "2-" + (i + 1);
		});
  }
}