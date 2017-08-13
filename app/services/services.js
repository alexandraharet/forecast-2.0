// services

/*

weather API object example: https://api.darksky.net/forecast/2cb2a6600011ce4ca629efa9e07cc9bd/44.439663,26.096306?exclude=minutely,flags
location API example: https://maps.googleapis.com/maps/api/geocode/json?address=Bucharest&key=AIzaSyBvzrK2_Fr84Od185gbDGxlpRapNcJE4BY

*/

(function(){
    "use strict";
    angular
    .module('weatherApp')
    .factory('addressService', service);

    function service($http, $q) {
        var exports = {
            callLocationApi: callLocationApi,
            getCoordinates: getCoordinates,
            getFormattedAddress: getFormattedAddress
        };

        var formattedAddress, coordinates, addressApiResponse;

        function getAddressFromApi(address) {
            addressApiResponse = $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyBvzrK2_Fr84Od185gbDGxlpRapNcJE4BY');
            return addressApiResponse;
        }

        function callLocationApi(address) {
            var deferred = $q.defer();
            if(getAddressFromApi(address)) {
                deferred.resolve(addressApiResponse);
            }
            else deferred.reject('Error returing the addressAPI response');
            return deferred.promise;
        }

        function getFormattedAddress(addressApiResponse) {
            formattedAddress = addressApiResponse.data.results["0"].formatted_address;
            return formattedAddress;
        }

        function getCoordinates(addressApiResponse) {
            coordinates = {
                lat: addressApiResponse.data.results["0"].geometry.location.lat,
                lon: addressApiResponse.data.results["0"].geometry.location.lng
            };
            return coordinates;
        }
        return exports;
    }
})();

(function(){
    "use strict";
    angular
    .module('weatherApp')
    .factory('weatherService', service);

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
            if(Fah) {
                // console.log('called with: ' + Fah);
                var temperature = Math.round((Fah - 32)/1.8);
                console.log("$scope.temperature is: " + temperature);
                return temperature;
            } else {
                return null;
            }
        }

        function convertToDate(time) {
            if(time)
            return new Date(time * 1000);
            else
            return null;
        }

        function convertToPercentage(num) {
            // if(num)
            return Math.round(num * 100);
            // else
            // return null;
        }

        return exports;
    }
})();
