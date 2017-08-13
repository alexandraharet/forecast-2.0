// directives

angular
    .module('weatherApp')
    .directive("wfWeatherWrapper", function() {
    return {
        restrict: "E",
        templateUrl: "templates/weatherWrapper.html",
        scope: {
            weatherResult: "=",
            convertToCelsius: "&"
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
            convertToCelsius: "&",
            weather: "="
        },
        replace: true,
        controller: function($scope) {
            var weatherData = {
                time: $scope.weather.time,
                summary: $scope.weather.summary,
                icon: $scope.weather.icon,
                temperature: $scope.weather.temperature,
                feelsLike: $scope.weather.apparentTemperature,
                precipitation: $scope.weather.precipProbability,
                windSpeed: $scope.weather.windSpeed
            };

            var vm = this;
            $scope.temperature = weatherData.temperature;

            $scope.convert = function() {
                console.log('convert() called');
                $scope.temperature = weatherData.temperature;
                $scope.convertToCelsius({temperature: $scope.temperature});
                console.log($scope);
            };
        },
        controllerAs: 'hourly'
    };
});

angular
    .module('weatherApp')
    .directive("wfWeatherReportDaily", function() {
    return {
        restrict: "E",
        templateUrl: "templates/weatherReportDaily.html",
    };
});
