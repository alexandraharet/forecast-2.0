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

    function service($http, $resource) {

        var exports = {
            callLocationApi: callLocationApi,
            getCoordinates: getCoordinates,
            getFormattedAddress: getFormattedAddress,
            callWeatherApi: callWeatherApi
        };

        var formattedAddress = "";
        var coordinates = "";
        var coordinates = undefined;

        function callLocationApi(address) {
            return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyBvzrK2_Fr84Od185gbDGxlpRapNcJE4BY');
        }

        function getFormattedAddress(apiResponse) {
            return apiResponse.data.results["0"].formatted_address;
        }

        function getCoordinates(apiResponse) {
            coordinates = {
                lat: apiResponse.data.results["0"].geometry.location.lat,
                lon: apiResponse.data.results["0"].geometry.location.lng
            };
            return coordinates;
        }

        function callWeatherApi(lat, lon) {
            return $http({
                url: 'php/forecast.php',
                method: 'get',
                params: {
                    lat: lat,
                    lon: lon
                    },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }
        // function getWeather (lat, lon)

        // return $q(function(resolve) {
        //     var getCoordinates = $resource('https://maps.googleapis.com/maps/api/geocode/json:params', {get:{method:'JSONP'}});
        //     var response = getCoordinates.get({
        //         address: address,
        //         key: 'AIzaSyBvzrK2_Fr84Od185gbDGxlpRapNcJE4BY'
        //     });
        //     if(response) {
        //         resolve(response);
        //     }
        // });

        // var deferred = $q.defer();
        // var getCoordinates = $resource('https://maps.googleapis.com/maps/api/geocode/json:params', {get:{method:'JSONP'}});
        // var response = getCoordinates.get({
        //     address: address,
        //     key: 'AIzaSyBvzrK2_Fr84Od185gbDGxlpRapNcJE4BY'
        // });
        //
        // deferred.resolve(response);
        //
        // return deferred.promise;

        // return getCoordinates.get({
        //     address: address,
        //     key: 'AIzaSyBvzrK2_Fr84Od185gbDGxlpRapNcJE4BY'
        // });
        // }

        return exports;
    }
})();

(function(){
    "use strict";
    angular
    .module('weatherApp')
    .factory('weatherService', service);

    function service($resource, $q) {

        var exports= {
            getWeather: getWeather
        };


        function getWeather(lat, lon) {
            var deferred = $q.defer();
            var weatherAPI = $resource('https://api.darksky.net/forecast/2cb2a6600011ce4ca629efa9e07cc9bd/:latlong', {jsonpCallbackParam: 'callback'}, {get:{method:'JSONP'}});

            var response = function() {
                weatherAPI.get({
                    latlong: lat+","+lon,
                    exclude: 'minutely,flags'
                });
            };

            deferred.resolve(response);

            return deferred.promise;
            // return weatherAPI.get({
            //     latlong: lat+","+lon,
            //     exclude: 'minutely,flags'
            //     });
        }

        return exports;
    }

})();
