(function() {
    "use strict";
    angular
    .module('weatherApp')
    .directive("wfWeatherSummary", ['weatherService', '$filter', function(weatherService, $filter) {
        return {
            restrict: "E",
            templateUrl: "templates/weatherSummary.html",
            scope: {
                weather: "=",
                unitSystem: '='
            },
            controller: ["$scope", function($scope) {

                var weatherData = {};
                var vm = this;
                vm.renderResult = {};

                updatedWeatherData();
                updateRenderedResult();

                function updatedWeatherData() {
                    weatherData = {
                        summary: $scope.weather.currently.summary,
                        icon: $scope.weather.currently.icon,
                        temperature: $scope.weather.currently.temperature,
                        apparentTemperature: $scope.weather.currently.apparentTemperature,
                        precipitation: weatherService.convertToPercentage($scope.weather.currently.precipProbability),
                        windSpeed: $scope.weather.currently.windSpeed,
                        speedUnit: 'mph',
                        temperatureUnit: '°F'
                    };
                }

                function updateRenderedResult() {
                    vm.renderResult = {};
                    angular.forEach(weatherData, function(value, key) {
                        if (vm.renderResult[key] !== weatherData[key]) {
                            vm.renderResult[key] = value;
                        }
                    });
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
            controllerAs: 'summary'
        };
    }]);
})();
