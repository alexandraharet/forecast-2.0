(function() {
	'use strict';
	angular
	.module('weatherApp')
	.controller('mainController', controller);

	function controller($rootScope, $scope, addressService, weatherService) {

		var coordinates;
		var vm = this;

		vm.address = "";
		vm.submitted = false;

		vm.weatherResult = undefined;
		vm.formattedAddress = undefined;

		vm.submit = function() {
			vm.submitted = true;
			addressService.callLocationApi(vm.address)
            .then(
				function(addressResponse){
					vm.formattedAddress = addressService.getFormattedAddress(addressResponse);
					coordinates = addressService.getCoordinates(addressResponse);
					return coordinates;
					},
				function(error) {
					console.log(error);
				})
			.then(
				function(coordinates) {
					weatherService.callWeatherApi(coordinates.lat, coordinates.lon)
					.then(
						function(weatherResponse) {
							vm.weatherResult = weatherResponse.data;
						});
				});
			};

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
