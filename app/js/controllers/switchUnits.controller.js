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
				$scope.unitSystem = unitSystem;
				return 'active';
			};
		}
		$scope.selectFahrenheit = function(unitSystem) {
			if (unitSystem === 'fahrenheit') {
				$scope.unitSystem = unitSystem;
				return 'active';
			};
		}

        $scope.$watch('unitSystem', function(){
			console.log($scope.unitSystem);
        });
    }
})();
