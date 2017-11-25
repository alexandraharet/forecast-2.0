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
