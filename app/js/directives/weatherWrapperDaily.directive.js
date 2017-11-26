(function() {
    "use strict";
    angular
    .module('weatherApp')
    .directive("wfWeatherWrapperDaily", function() {
        return {
            restrict: "E",
            templateUrl: "templates/weatherWrapperDaily.html",
            scope: {
                weatherResult: "=",
                timezoneOffset: '=',
                unitSystem: "="
            }
        };
    });
})();
