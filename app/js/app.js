(function(){
	"use strict";

	// module
	angular
		.module('weatherApp', ['ngRoute', 'ngResource', 'ngAnimate'])
		.config(['$sceDelegateProvider', function ($sceDelegateProvider) {

	    $sceDelegateProvider.resourceUrlWhitelist([
	    // Allow same origin resource loads.
	    'self',
	    // Allow loading from our assets domain.  Notice the difference between * and **.
	    'https://api.darksky.net/forecast/**',
	    'https://maps.googleapis.com/maps/**'
	  ]);

	}]);

})();
