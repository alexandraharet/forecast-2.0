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
    .directive("wfWeatherReportHourly", ['weatherService', function(weatherService) {
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

            convertToStandard(weatherData);

            function updatedWeatherData() {
                weatherData = {
                time: $scope.weather.time,
                summary: $scope.weather.summary,
                icon: $scope.weather.icon,
                temperature: $scope.weather.temperature,
                feelsLike: $scope.weather.apparentTemperature,
                precipitation: $scope.weather.precipProbability,
                windSpeed: $scope.weather.windSpeed
            };
            console.log(weatherData.summary);
            }

            $scope.$watch('weather', function(){
                updatedWeatherData();
                convertToStandard(weatherData);
                updateRenderedResult();
            });


            function updateRenderedResult() {
                angular.forEach(weatherData, function(value, key) {
                if(!vm.renderResult[key]) vm.renderResult[key] = value;
            });
            }

            function convertToStandard(weatherResult) {
                vm.renderResult.temperature =
                    weatherService.convertToCelsius(weatherResult.temperature);
                vm.renderResult.feelsLike =
                    weatherService.convertToCelsius(weatherResult.feelsLike);
                vm.renderResult.time =
                    weatherService.convertToDate(weatherResult.time);
                vm.renderResult.precipitation =
                    weatherService.convertToPercentage(weatherResult.precipitation);
            }
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
