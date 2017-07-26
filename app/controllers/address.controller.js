(function() {
	'use strict';
	angular
	.module('weatherApp')
	.controller('addressController', controller);

	function controller($rootScope, $scope, $location, addressService, $q) {

		var coordinates = undefined;
		var vm = this;

		vm.title = 'Hello';
		vm.address = "";
		vm.weatherResult = undefined;
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
						if(address.data.status === "ZERO_RESULTS") {
							console.log("Could not find an address for '" + vm.address + "', please try again"); //TODO
						}
						else {
							vm.formattedAddress = addressService.getFormattedAddress(address);
							coordinates = addressService.getCoordinates(address);

							addressService.callWeatherApi(coordinates.lat, coordinates.lon).then(
								function(response) {

									$q.defer =

									console.log(coordinates);
									console.log(response);
								vm.weatherResult = response.data;
							});

						}
				});

			}, 300);
		};

		function formatAddress(data) {
			return (data.results["0"].formatted_address);
		}
	}
})();
