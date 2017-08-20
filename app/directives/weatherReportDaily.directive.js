(function() {
    "use strict";
    angular
    .module('weatherApp')
    .directive("wfWeatherReportDaily", function() {
        return {
            restrict: "E",
            templateUrl: "templates/weatherReportDaily.html",
        };
    });
})();
