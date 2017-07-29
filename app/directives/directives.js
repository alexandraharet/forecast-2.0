// directives

angular
    .module('weatherApp')
    .directive("wfWeatherWrapper", function() {
    return {
        restrict: "E",
        templateUrl: "templates/weatherWrapper.html",
        scope: {
            convertToStandard: "&",
            convertToDate: "&",
            convertToPercentage: "&",
        },
        controller: function($scope) {

        }
    };
});

angular
    .module('weatherApp')
    .directive("wfWeatherReportHourly", function() {
    return {
        restrict: "E",
        templateUrl: "templates/weatherReportHourly.html",
        scope: {
            weatherResult: "="
        },
        controller: function($scope) {
            var weatherResult = $scope.weatherResult;
            $scope.$watch(weatherResult,
                function() {
                    console.log('watch triggered');
                    console.log(weatherResult);
                });
        }
    };
});

angular
    .module('weatherApp')
    .directive("wfWeatherReportDaily", function() {
    return {
        restrict: "E",
        templateUrl: "templates/weatherReportDaily.html",
        scope: {
            weatherResult: "=",
            convertToStandard: "&",
            convertToDate: "&",
            convertToPercentage: "&",
        }
    };
});
