(function() {
    "use strict";
    angular
    .module('weatherApp')
    .directive("wfWeatherWrapper", function() {
        return {
            restrict: "E",
            templateUrl: "templates/weatherWrapper.html",
            scope: {
                weatherResult: "=",
                convertToCelsius: "&",
                timezoneOffset: '='
            }
        };
    });
})();
