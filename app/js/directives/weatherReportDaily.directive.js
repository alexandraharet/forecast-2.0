(function() {
    "use strict";
    angular
    .module('weatherApp')
    .directive("wfWeatherReportDaily", ['weatherService', '$filter', '$interpolate', function(weatherService, $filter, $interpolate) {
        return {
            restrict: "E",
            templateUrl: "templates/weatherReportDaily.html",
            scope: {
                weather: "=",
                timezoneOffset: '=',
                unitSystem: '='
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

                $scope.$watch('weather', function(newVal, oldVal) {
                    updatedWeatherData();
                    updateRenderedResult();
                });


                function updatedWeatherData() {
                    weatherData = {
                        time: weatherService.convertToDate($scope.weather.time),
                        summary: $scope.weather.summary,
                        icon: $scope.weather.icon,
                        minTemp: Math.round($scope.weather.temperatureMin),
                        maxTemp: Math.round($scope.weather.temperatureMax),
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
                    if($scope.unitSystem === 'celsius') {
                        angular.extend(vm.renderResult, weatherService.convertToStandard(vm.renderResult));
                    }
                }

                $scope.$watch('unitSystem', function(newVal, oldVal) {
                    if (newVal === 'fahrenheit' && oldVal !== newVal) {
                        angular.extend(vm.renderResult, weatherService.convertToImperial(vm.renderResult));
                    }
                    if (newVal === 'celsius'  && oldVal !== newVal) {
                        angular.extend(vm.renderResult, weatherService.convertToStandard(vm.renderResult));
                    }
                });
            }],
            controllerAs: 'daily'
        };
    }]);
})();
