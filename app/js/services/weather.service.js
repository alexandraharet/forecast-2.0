(function(){
    "use strict";
    angular
    .module('weatherApp')
    .factory('weatherService', service);

    service.$inject = ["$http", "$q"];

    function service($http, $q) {
        var exports = {
            callWeatherApi: callWeatherApi,
            convertToCelsius: convertToCelsius,
            convertToDate: convertToDate,
            convertToPercentage: convertToPercentage,
            convertToStandard: convertToStandard,
            convertToImperial: convertToImperial,
            convertToMiles: convertToMiles
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
                temperature: convertToCelsius(weatherData.temperature) || '',
                apparentTemperature: convertToCelsius(weatherData.apparentTemperature) || '',
                minTemp: convertToCelsius(weatherData.minTemp) || '',
                maxTemp: convertToCelsius(weatherData.maxTemp) || '',
                windSpeed: convertToKm(weatherData.windSpeed) || '',
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
