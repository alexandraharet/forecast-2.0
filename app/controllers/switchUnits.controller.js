(function() {
	'use strict';
	angular
	.module('weatherApp')
	.controller('switchUnitsController', controller);

    controller.$inject = ["$scope"];

	function controller($scope) {
		$scope.unitSystem = 'celsius';
		$scope.selectCelsius = function(unitSystem) {
			if (unitSystem === 'celsius') {
				return 'active';
			};
		}
		$scope.selectFahrenheit = function(unitSystem) {
			if (unitSystem === 'fahrenheit') {
				return 'active';
			};
		}
    }
})();
