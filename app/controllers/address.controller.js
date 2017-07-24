(function() {
	'use strict';
	angular
	.module('weatherApp')
	.controller('addressController', controller);

	function controller($rootScope, $scope, $location, addressService) {

		var coordinates = undefined;
		var vm = this;

		vm.title = 'Hello';
		vm.address = "";

		vm.formattedAddress = undefined;


		// $scope.$watch("address", function () {
		// 	addressService.address = $scope.address;
		// });

		vm.submit = function() {
			vm.submitted = false;
			setTimeout(function() {
				vm.submitted = true;
				addressService.callLocationApi(vm.address).then(
					function(address) {
						if(response.data.status === "ZERO_RESULTS") {
							console.log("Could not find an address for '" + vm.address + "', please try again"); //TODO
						}
						else {
							vm.formattedAddress = addressService.getFormattedAddress(address);
							coordinates = addressService.getCoordinates(address);
						}
				});

				addressService.callWeatherApi(coordinates.lat, coordinates.lon).then(
					function(response) {
					vm.weatherResult = response;
				});

				// addressService.getFormattedAddress(vm.address);

                // addressService.getCoordinates(vm.address);




				// .then(function(data) {
				// 	vm.formatAddress = formatAddress(data);

				// 	weatherService.getWeather(vm.lat, vm.lon).then(function(data) {
				// 		vm.weatherResult = data;
				// 		console.log(vm.weatherResult);
				// 	});
				//
				// });
			}, 300);
		};

		function formatAddress(data) {
			return (data.results["0"].formatted_address);
		}
	}
})();
