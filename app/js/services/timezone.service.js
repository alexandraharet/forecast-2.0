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
        var timezoneApiResponse;

        function getTimezoneFromApi(lat, lon) {
            var timestamp = Math.floor(Date.now() / 1000);

            timezoneApiResponse = $http({
                url: 'php/timezone.php',
                method: 'get',
                params: {
                    lat: lat,
                    lon: lon,
                    timestamp: timestamp
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
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
