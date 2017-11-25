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

		function convertToStandard() {
			var result = weatherService.convertToStandard(vm.weatherResult);
			 angular.forEach(result, function(value, key) {
				 vm.renderResult[key] = value;
			 });
		}

		function buildRenderResultObject(weatherResult) {
			var getLocalTime =  weatherService.convertToDate(weatherResult.currently.time);
			vm.renderResult = {
				icon: weatherResult.currently.icon,
				summary: weatherResult.currently.summary,
				windSpeed: weatherService.convertToMiles(weatherResult.currently.windSpeed),
				localTime: getLocalTime,
				date: weatherService.convertToDate(weatherResult.daily.data[1].time),
				precip: weatherService.convertToPercentage(weatherResult.currently.precipProbability),
				temperature: weatherResult.currently.apparentTemperature,
				minTemp: weatherResult.daily.data[1].temperatureMin,
				maxTemp: weatherResult.daily.data[1].temperatureMax
			};
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

		//TODO
		var WeatherResultConstructor = function(apiResponse, dataPoint, ...[a, b, c]) {
			function transformToBracketNotation(dotNotation) {
				var postStr = dotNotation.replace(".", "['");
				postStr = postStr.replace(/\./g, "']['");

			}
			this.temperature = apiResponse[dataPoint].apparentTemperature;
			this.feelsLike = apiResponse[dataPoint].apparentTemperature;
			this.maxTemp = apiResponse[a][b][c].temperatureMax;
			this.date = apiResponse[a][b][c].time;
			this.precip = apiResponse[a][b][c].precipProbability;
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
								convertToStandard();
								vm.loading = false;
							});
						})

					};
				}
			})();
