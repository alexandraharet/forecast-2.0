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
    .directive("wfWeatherReportHourly", ['weatherService', '$filter', function(weatherService, $filter) {
    return {
        restrict: "E",
        templateUrl: "templates/weatherReportHourly.html",
        scope: {
            convertToCelsius: "&",
            weather: "="
        },
        controller: function($scope) {
            var weatherData = {};
            var vm = this;
            vm.renderResult = {};

            function updatedWeatherData() {
                weatherData = {
                    time: $scope.weather.time,
                    summary: $scope.weather.summary,
                    icon: $scope.weather.icon,
                    temperature: $scope.weather.temperature,
                    feelsLike: $scope.weather.apparentTemperature,
                    precipitation: $scope.weather.precipProbability,
                    windSpeed: $scope.weather.windSpeed,
                };
            }

            function updateRenderedResult() {
                vm.renderResult = {};
                angular.forEach(weatherData, function(value, key) {
                if(vm.renderResult[key] !== weatherData[key]) vm.renderResult[key] = value;
            });
            }

            function convertToStandard(weatherResult) {
                vm.renderResult.temperature =
                    weatherService.convertToCelsius(weatherResult.temperature);
                vm.renderResult.feelsLike =
                    weatherService.convertToCelsius(weatherResult.feelsLike);
                vm.renderResult.localtime =
                    weatherService.convertToDate(weatherResult.time);
                vm.renderResult.precipitation =
                    weatherService.convertToPercentage(weatherResult.precipitation);
            }

            $scope.$watch('weather', function(){
                updatedWeatherData();
                updateRenderedResult();
                convertToStandard(weatherData);
            });

        },
        controllerAs: 'hourly'
    };
}]);

angular
    .module('weatherApp')
    .directive("wfWeatherReportDaily", function() {
    return {
        restrict: "E",
        templateUrl: "templates/weatherReportDaily.html",
    };
});
