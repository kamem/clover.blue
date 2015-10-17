/// <reference path="../typings/tsd.d.ts" />
'use strict';

declare var twttr;
declare var FB;
declare var gapi;
declare var ___gcfg;

export class mainService {
  public CreatePageNav($scope) {
  	var $h = angular.element(document.querySelectorAll("h2:not(.pageNav)"));
		angular.forEach($h,(ele, i) => {
			ele.id = "2-" + (i + 1);
		});
		$scope.pageHeadingElement = $h;
  }

	public ChangeTitle() {
		var title = decodeURI(angular.element(document.querySelectorAll("main h1")).text()) + ' - clover.blue';
		angular.element(document.querySelectorAll("title")).text(title);
	}

	public PageKerning() {
		$('h1,.content h2,.content h3,.content h4,.content li,.content p').kerning();
	}

	public LoadSns() {
		angular.element(document).ready(() => {
			//twitter
			if(typeof twttr !== 'undefined') {
				var $tweetButton = angular.element(document.querySelectorAll(".twitter-share-button"));
				$tweetButton.attr('data-url', document.location.href);
				$tweetButton.attr('data-text', document.title);
				twttr.widgets.load();
			};

			//facebook
			if(typeof FB !== 'undefined') {
				var ele = angular.element(document.querySelectorAll(".facebookLikelike"))[0];
				FB.XFBML.parse(ele);
			};

			//google
			if(typeof gapi !== 'undefined') {
				var ele = angular.element(document.querySelectorAll(".g-plusone"))[0];
				gapi.plusone.render(ele, {size: "medium", width: "120px"});
			};
		});
	}
}