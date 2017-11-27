(function(){
    "use strict";
    angular
    .module('weatherApp')
    .factory('weatherService', service);

    service.$inject = ["$http", "$q"];

    function service($http, $q) {
        var exports = {
            callWeatherApi: callWeatherApi,
            convertToDate: convertToDate,
            convertToPercentage: convertToPercentage,
            convertToStandard: convertToStandard,
            convertToImperial: convertToImperial,
            WeatherResultConstructor: WeatherResultConstructor
        };
        var weatherApiResponse;

        function getWeatherFromApi(lat, lon) {
            weatherApiResponse = $http({
                url: 'php/forecast.php',
                method: 'get',
                params: {
                    lat: lat,
                    lon: lon
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            return weatherApiResponse;
        }

        function callWeatherApi(lat, lon) {
            var deferred = $q.defer();
            if(getWeatherFromApi(lat, lon)) {
                deferred.resolve(weatherApiResponse);
            }
            else deferred.reject('Error returing the weaherApi response');
            return deferred.promise;
        }

        function WeatherResultConstructor(apiResponse, mainDataPoint, ...[a, b, c]) {
			// var getLocalTime =  weatherService.convertToDate(apiResponse.time);
			var data = {
				icon: apiResponse[mainDataPoint].icon,
				summary: apiResponse[mainDataPoint].summary,
				windSpeed: Math.round(apiResponse[mainDataPoint].windSpeed),
				precipitation: convertToPercentage(apiResponse[mainDataPoint].precipProbability),
				temperature:  Math.round(apiResponse[mainDataPoint].temperature),
				apparentTemperature: Math.round(apiResponse[mainDataPoint].apparentTemperature),
                date: (a && b && c) ? convertToDate(apiResponse[a][b][c].time) : '',
				minTemp: (a && b && c) ? Math.round(apiResponse[a][b][c].temperatureMin) : '',
				maxTemp: (a && b && c) ? Math.round(apiResponse[a][b][c].temperatureMax) : '',
				speedUnit: 'mph',
				temperatureUnit: '°F'
			}
			return data;
		};

        function convertToImperial(weatherData) {
            var result = {
                temperature: convertToFahrenheit(weatherData.temperature) || '',
                apparentTemperature: convertToFahrenheit(weatherData.apparentTemperature) || '',
                minTemp: convertToFahrenheit(weatherData.minTemp) || '',
                maxTemp: convertToFahrenheit(weatherData.maxTemp) || '',
                windSpeed: convertToMiles(weatherData.windSpeed) || '',
                speedUnit: 'mph',
                temperatureUnit: '°F'
            }
            return result;
        }

        function convertToStandard(weatherData) {
            var result = {
                temperature: !isNaN(weatherData.temperature) ? convertToCelsius(weatherData.temperature) : '',
                apparentTemperature: !isNaN(weatherData.apparentTemperature) ? convertToCelsius(weatherData.apparentTemperature) : '',
                minTemp: !isNaN(weatherData.minTemp) ? convertToCelsius(weatherData.minTemp) : '',
                maxTemp: !isNaN(weatherData.maxTemp) ? convertToCelsius(weatherData.maxTemp) : '',
                windSpeed: !isNaN(weatherData.windSpeed) ? convertToKm(weatherData.windSpeed) : '',
                speedUnit: 'km/h',
                temperatureUnit: '°C'
            }
            return result;
		}


        function convertToMiles(km) {
            return km ? Math.round(km * 0.621371) : null;
        }

        function convertToKm(mi) {
            return mi ? Math.round(mi * 1.609344) : null;
        }

        function convertToCelsius(Fah) {
            return Fah ?  Math.round((Fah - 32)/1.8) : null;
        }

        function convertToFahrenheit(Cel) {
            return Cel ?  Math.round(Cel * 1.8 + 32) : null;
        }

        function convertToDate(time) {
            return time ? new Date(time * 1000) : null;
        }

        function convertToPercentage(num) {
            return (typeof(num) === 'number') ? Math.round(num * 100) : null;
        }

        return exports;
    }
})();
