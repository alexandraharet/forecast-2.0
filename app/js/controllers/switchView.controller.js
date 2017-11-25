(function() {
	'use strict';
	angular
	.module('weatherApp')
	.controller('switchViewController', controller);

    controller.$inject = ["$scope"];

	function controller($scope) {
		$scope.selectedView = 'hourly';
		$scope.showHourly = function(selectedView) {
			if (selectedView === 'hourly') {
				return 'active';
			};
		}
		$scope.showDaily = function(selectedView) {
			if (selectedView === 'daily') {
				return 'active';
			};
		}
    }
})();
