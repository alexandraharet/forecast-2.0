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
            convertToPercentage: convertToPercentage
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

        function convertToCelsius(Fah) {
            return Fah ?  Math.round((Fah - 32)/1.8) : null;
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
