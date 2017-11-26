(function() {
    "use strict";
    angular
    .module('weatherApp')
    .directive("wfWeatherReportHourly", ['weatherService', '$filter', '$interpolate', function(weatherService, $filter, $interpolate) {
        return {
            restrict: "E",
            templateUrl: "templates/weatherReportHourly.html",
            scope: {
                weather: "=",
                timezoneOffset: '=',
                unitSystem: "="
            },
            link: function (scope, elm, attrs) {
                var timezoneOffset = $interpolate(scope.timezoneOffset);
                scope.timezoneOffset = timezoneOffset(scope);
            },
            controller: ["$scope", function($scope) {
                var weatherData = {};
                var vm = this;
                vm.renderResult = {};
                vm.timezoneOffset = '';

                updatedWeatherData();
                updateRenderedResult();
                convertToLocalTime(weatherData);

                function updatedWeatherData() {
                    weatherData = {
                        time: $scope.weather.time,
                        summary: $scope.weather.summary,
                        icon: $scope.weather.icon,
                        temperature: Math.round($scope.weather.temperature),
                        apparentTemperature: Math.round($scope.weather.apparentTemperature),
                        precipitation: weatherService.convertToPercentage($scope.weather.precipProbability),
                        windSpeed: Math.round($scope.weather.windSpeed),
                        speedUnit: 'mph',
                        temperatureUnit: '°F'
                    };
                }

                function updateRenderedResult() {
                    vm.timezoneOffset =  $scope.timezoneOffset;
                    vm.renderResult = {};
                    angular.forEach(weatherData, function(value, key) {
                        if(vm.renderResult[key] !== weatherData[key]) vm.renderResult[key] = value;
                    });
                }

                function convertToLocalTime(weatherResult) {
                    vm.renderResult.localtime =
                    weatherService.convertToDate(weatherResult.time)
                }

                $scope.$watch('unitSystem', function() {
                    if ($scope.unitSystem === 'fahrenheit') {
                        angular.extend(vm.renderResult, weatherService.convertToImperial(vm.renderResult));
                    }
                    if ($scope.unitSystem === 'celsius') {
                        angular.extend(vm.renderResult, weatherService.convertToStandard(vm.renderResult));
                    }
                });

            }],
            controllerAs: 'hourly'
        };
    }]);
})();
