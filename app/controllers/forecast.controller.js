(function() {
	'use strict';
	angular
	.module('weatherApp')
	.controller('forecastController', controller);

	function controller(addressService, $scope){

		var vm = this;

		vm.convertToCelsius = function(Fah) {
			if(Fah)
			return Math.round((Fah - 32)/1.8);
			else
			return null;
		};

		vm.convertToDate = function(time) {
			if(time)
			return new Date(time * 1000);
			else
			return null;
		};

		vm.convertToPercentage = function(num) {
			if(num)
			return Math.round(num * 100);
			else
			return null;
		};
	}
})();


// not used
/*
weatherApp.controller('timeframeController', ['$scope', 'addressService', function($scope, addressService) {

$scope.timeframe = "24h";
$scope.changeTimeframe = function(t){
$scope.timeframe = t;
return $scope.timeframe;
}
}])
*/
