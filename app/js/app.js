//module
(function(){
	"use strict";
	angular
		.module('weatherApp', ['ngRoute', 'ngResource', 'ngAnimate'])
		.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
	    $sceDelegateProvider.resourceUrlWhitelist([
	    // Allow same origin resource loads.
	    'self',
	  ]);
	}]);
})();
