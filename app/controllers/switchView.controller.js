(function() {
	'use strict';
	angular
	.module('weatherApp')
	.controller('switchViewController', controller);

    controller.$inject = ["$scope"];

	function controller($scope) {
		$scope.value = 'hourly';
    }
})();
