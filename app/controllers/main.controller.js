(function() {
	'use strict';
	angular
	.module('weatherApp')
	.controller('mainController', controller);

	function controller($rootScope, $scope, addressService, weatherService) {

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
			vm.renderResult = {
				icon: weatherResult.currently.icon,
				summary: weatherResult.currently.summary,
				windSpeed: weatherResult.currently.windSpeed
			};
		}

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
								// var renderResponse = new WeatherResultConstructor(weatherResponse.data, 'currently', 'daily.data.1'); // TODO
								// buildRenderResultObject(vm.weatherResult); // TODO
								buildRenderResultObject(vm.weatherResult);
								convertToStandard(vm.weatherResult);
							});
						});
					};


				}
			})();
