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

		function buildRenderResultObject(weatherResult) {
			var getLocalTime =  weatherService.convertToDate(weatherResult.currently.time);
			vm.renderResult = {
				icon: weatherResult.currently.icon,
				summary: weatherResult.currently.summary,
				windSpeed: Math.round(weatherResult.currently.windSpeed),
				date: weatherService.convertToDate(weatherResult.daily.data[1].time),
				precipitation: weatherService.convertToPercentage(weatherResult.currently.precipProbability),
				temperature: Math.round(weatherResult.currently.apparentTemperature),
				minTemp: Math.round(weatherResult.daily.data[1].temperatureMin),
				maxTemp: Math.round(weatherResult.daily.data[1].temperatureMax),
				speedUnit: 'mph',
				temperatureUnit: '°F'
			};
			// TODO
			// vm.localTime =  weatherService.convertToDate(weatherResult.currently.time);
		}

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

		var WeatherResultConstructor = function(apiResponse, mainDataPoint, ...[a, b, c]) {
			this.temperature = apiResponse[mainDataPoint].apparentTemperature;
			this.feelsLike = apiResponse[mainDataPoint].apparentTemperature;
			this.maxTemp = apiResponse[a][b][c].temperatureMax;
			this.date = apiResponse[a][b][c].time;
			this.precipiation = apiResponse[a][b][c].precipProbability;
		};

		vm.address = "";
		vm.submitted = false;

		vm.weatherResult = undefined;
		vm.renderResult = {};
		vm.formattedAddress = undefined;

		vm.loading = false;

		vm.submit = function() {
			vm.submitted = true;
			vm.loading = true;
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
						timezoneService.callTimezoneApi(coordinates.lat, coordinates.lon)
						.then(
							function(timezoneResponse) {
								var rawOffset = (timezoneResponse.data.rawOffset + timezoneResponse.data.dstOffset)/3600;
								vm.timezoneOffset = convertTimezoneOffset(rawOffset);
							}
						);
						weatherService.callWeatherApi(coordinates.lat, coordinates.lon)
						.then(
							function(weatherResponse) {
								vm.weatherResult = weatherResponse.data;
								var renderResponse = new WeatherResultConstructor(weatherResponse.data, 'currently', 'daily', 'data', '1');
								buildRenderResultObject(vm.weatherResult);
								vm.loading = false;
							});
						})

					};
				}
			})();
