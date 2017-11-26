(function() {
    "use strict";
    angular
    .module('weatherApp')
    .directive("wfWeatherWrapperHourly", function() {
        return {
            restrict: "E",
            templateUrl: "templates/weatherWrapperHourly.html",
            scope: {
                weatherResult: "=",
                timezoneOffset: '=',
                unitSystem: '='
            }
        };
    });
})();
