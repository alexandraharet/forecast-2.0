(function() {
	'use strict';
	angular
	.module('weatherApp')
	.controller('addressController', controller);

	function controller($rootScope, $scope, addressService, weatherService) {

		var coordinates;
		var vm = this;

		vm.address = "";
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
	}
})();
