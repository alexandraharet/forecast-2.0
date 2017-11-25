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
