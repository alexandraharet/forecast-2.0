(function() {
    "use strict";
    angular
    .module('weatherApp')
    .directive("wfWeatherResult", ['$interpolate',
    function($interpolate) {
        return {
            restrict: "E",
            templateUrl: "templates/weatherResult.html"
        };
    }]);
})();
