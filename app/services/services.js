// services
(function(){
    "use strict";
    angular
    .module('weatherApp')
    .factory('addressService', service);

    service.$inject = ["$http", "$q"];

    function service($http, $q) {
        var exports = {
            callLocationApi: callLocationApi,
            getCoordinates: getCoordinates,
            getFormattedAddress: getFormattedAddress,
        };
        var formattedAddress, coordinates, addressApiResponse;

        function getAddressFromApi(address) {
            addressApiResponse = $http({
                url: 'php/coordinates.php',
                method: 'get',
                params: {
                    address: address
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
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
            formattedAddress = addressApiResponse.data.results[0].formatted_address;
            return formattedAddress;
        }

        function getCoordinates(addressApiResponse) {
            coordinates = {
                lat: addressApiResponse.data.results[0].geometry.location.lat,
                lon: addressApiResponse.data.results[0].geometry.location.lng
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
    .factory('timezoneService', service);

    service.$inject = ["$http", "$q"];

    function service($http, $q) {
        var exports = {
            callTimezoneApi: callTimezoneApi
        };
        var timezoneApiResponse= '';

        function getTimezoneFromApi(lat, lon) {
            var timeStamp = Math.floor(Date.now() / 1000)
            timezoneApiResponse = $http.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + lon + '&timestamp=' + timeStamp + '&key=AIzaSyAsOiLqL4k2xnWSbGmFzmdwaWMhAmyZ5Ss');
            return timezoneApiResponse;
        }

        function callTimezoneApi(lat, lon) {
            var deferred = $q.defer();
            if(getTimezoneFromApi(lat, lon)) {
                deferred.resolve(timezoneApiResponse);
            }
            else deferred.reject('Error returing the timezoneApi response');
            return deferred.promise;
        }
        return exports;
    }
})();

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
            if(Fah) {
                var temperature = Math.round((Fah - 32)/1.8);
                return temperature;
            } else {
                return null;
            }
        }

        function convertToDate(time) {
            if(time) {
                return new Date(time * 1000);
            } else {
                return null;
            }
        }

        function convertToPercentage(num) {
            if(typeof(num) === 'number') {
                return Math.round(num * 100);
            } else {
                return null;
            }
        }

        // function convertToStandard(weatherResult) {
        //     angular.forEach(properties in weatherResult, function(key, value) {
        //         vm.renderResult.temperature =
        //             weatherService.convertToCelsius(weatherResult.currently.apparentTemperature);
        //         vm.renderResult.minTemp =
        //             weatherService.convertToCelsius(weatherResult.daily.data[1].temperatureMin);
        //         vm.renderResult.maxTemp =
        //             weatherService.convertToCelsius(weatherResult.daily.data[1].temperatureMax);
        //         vm.renderResult.date =
        //             weatherService.convertToDate(weatherResult.daily.data[1].time);
        //         vm.renderResult.precip =
        //             weatherService.convertToPercentage(weatherResult.currently.precipProbability);
        //     });
        // }

        return exports;
    }
})();
