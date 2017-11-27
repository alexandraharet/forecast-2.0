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

                $scope.$watch('weather', function(newVal, oldVal) {
                    updatedWeatherData();
                    updateRenderedResult();
                });


                function updatedWeatherData() {
                    weatherData = weatherService.WeatherResultConstructor($scope.weather, 'currently');
                }

                function updateRenderedResult() {
                    vm.renderResult = {};
                    angular.forEach(weatherData, function(value, key) {
                        if (vm.renderResult[key] !== weatherData[key]) {
                            vm.renderResult[key] = value;
                        }
                    });
                    if($scope.unitSystem === 'celsius') {
                        angular.extend(vm.renderResult, weatherService.convertToStandard(vm.renderResult));
                    }
                }

                $scope.$watch('unitSystem', function(newVal, oldVal) {
                    if (newVal === 'fahrenheit' && oldVal !== newVal) {
                        angular.extend(vm.renderResult, weatherService.convertToImperial(vm.renderResult));
                    }
                    if (newVal === 'celsius' && oldVal !== newVal) {
                        angular.extend(vm.renderResult, weatherService.convertToStandard(vm.renderResult));
                    }
                });
            }],
            controllerAs: 'summary'
        };
    }]);
})();
