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

		function convertToStandard(weatherResult) {
			vm.renderResult.temperature =
			weatherService.convertToCelsius(weatherResult.currently.apparentTemperature);
			vm.renderResult.minTemp =
			weatherService.convertToCelsius(weatherResult.daily.data[1].temperatureMin);
			vm.renderResult.maxTemp =
			weatherService.convertToCelsius(weatherResult.daily.data[1].temperatureMax);
			vm.renderResult.date =
			weatherService.convertToDate(weatherResult.daily.data[1].time);
			vm.renderResult.precip =
			weatherService.convertToPercentage(weatherResult.currently.precipProbability);
		}

		function buildRenderResultObject(weatherResult) {
			var getLocalTime =  weatherService.convertToDate(weatherResult.currently.time);
			vm.renderResult = {
				icon: weatherResult.currently.icon,
				summary: weatherResult.currently.summary,
				windSpeed: weatherResult.currently.windSpeed,
				localTime: getLocalTime
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
		// var WeatherResultConstructor = function(apiResponse, dataPoint, altDataPoint) {
		// 	function transformToBracketNotation(dotNotation) {
		// 		var postStr = dotNotation.replace(".", "['");
		// 		postStr = postStr.replace(/\./g, "']['");
		//
		// 	}
		// 	this.temperature = apiResponse[dataPoint].apparentTemperature;
		// 	// this.feelsLike = apiResponse[dataPoint].feelsLike;
		// 	// this.minTemp = apiResponse. "daily.data[1]" .temperatureMin; // use other Data Point
		// 	this.minTemp = apiResponse['daily']['data']['1']['temperatureMin']; // use other Data Point
		// 	this.maxTemp = apiResponse.altDataPoint.temperatureMax;
		// 	this.date = apiResponse[altDataPoint].time;
		// 	this.precip = apiResponse[altDataPoint].precipProbability;
		// };

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
								// var renderResponse = new WeatherResultConstructor(weatherResponse.data, 'currently', 'daily.data.1'); // TODO
								// buildRenderResultObject(vm.weatherResult); // TODO
								buildRenderResultObject(vm.weatherResult);
								convertToStandard(vm.weatherResult);
								vm.loading = false;
							});
						})

					};
				}
			})();
