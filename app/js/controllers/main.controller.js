//controllers
(function() {
	'use strict';
	angular
	.module('weatherApp')
	.controller('mainController', controller);

	controller.$inject = ["$rootScope", "$scope", "addressService", "weatherService", "timezoneService"];


	function controller($rootScope, $scope, addressService, weatherService, timezoneService) {

		var coordinates, weatherResult;

		var vm = this;

		function convertTimezoneOffset(rawOffset) {
			var convertedOffset = '';
			var str = (rawOffset * 100).toString();
			var isNegative = false;

			if (rawOffset < 0) {
				convertedOffset += '-';
				isNegative = true;
			} else {
				convertedOffset += '+';
			}

			if (isNegative) {
				// builds the first two digits of the timezoneOffset
				(str.length === 5) ? convertedOffset += str.slice(1,3) : convertedOffset += '0' + str.slice(1,2);
			} else {
				(str.length === 4) ? convertedOffset += str.slice(0,2) : convertedOffset += '0' + str.slice(0,1);
			}

			// builds the last two digits of the timezoneOffset
			if(str.slice(-2) == 50) {
				convertedOffset += '30';
			} else if(str.slice(-2) == 75) {
				convertedOffset += '45';
			} else {
				convertedOffset += '00';
			}
			return convertedOffset;
		};

		vm.address = "";
		vm.submitted = false;

		vm.weatherResult = undefined;
		vm.renderResult = {};
		vm.formattedAddress = undefined;

		vm.loading = false;

		vm.submit = function() {
			if(vm.address) {
				vm.noAddress = false;
				vm.submitted = true;
				vm.loading = true;
				addressService.callLocationApi(vm.address)
				.then( function(addressResponse){
					if (addressResponse.data.status !== 'ZERO_RESULTS') {
						vm.addressError = false;
						vm.formattedAddress = addressService.getFormattedAddress(addressResponse);
						coordinates = addressService.getCoordinates(addressResponse);
						return coordinates;
					}
				})
				.then( function(coordinates) {
					timezoneService.callTimezoneApi(coordinates.lat, coordinates.lon)
					.then( function(timezoneResponse) {
						var rawOffset = (timezoneResponse.data.rawOffset + timezoneResponse.data.dstOffset)/3600;
						vm.timezoneOffset = convertTimezoneOffset(rawOffset);
						vm.localTime = new Date();
					});
					weatherService.callWeatherApi(coordinates.lat, coordinates.lon)
					.then( function(weatherResponse) {
						vm.weatherResult = weatherResponse.data;
						vm.loading = false;
					});
				})
			} else {
				vm.noAddress = true;
			}
		};
	}
})();
