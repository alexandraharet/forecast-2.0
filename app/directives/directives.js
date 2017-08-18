// directives

angular


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

    angular
    .module('weatherApp')
    .directive("wfWeatherReportHourly", ['weatherService', '$filter', '$interpolate', function(weatherService, $filter, $interpolate) {
        return {
            restrict: "E",
            templateUrl: "templates/weatherReportHourly.html",
            scope: {
                weather: "=",
                timezoneOffset: '='
            },
            link: function (scope, elm, attrs) {
                var timezoneOffset = $interpolate(scope.timezoneOffset);
                scope.timezoneOffset = timezoneOffset(scope);
            },
            controller: function($scope) {
                var weatherData = {};
                var vm = this;
                vm.renderResult = {};

                vm.timezoneOffset = '';

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
                    vm.timezoneOffset =  $scope.timezoneOffset;
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

                    // console.log(vm.renderResult);
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
