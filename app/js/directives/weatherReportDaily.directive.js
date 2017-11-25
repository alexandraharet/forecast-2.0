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

                function updatedWeatherData() {
                    weatherData = {
                        time: $scope.weather.time,
                        summary: $scope.weather.summary,
                        icon: $scope.weather.icon,
                        temperatureMin: $scope.weather.temperatureMin,
                        temperatureMax: $scope.weather.temperatureMax,
                        precipitation: $scope.weather.precipProbability,
                        windSpeed: $scope.weather.windSpeed,
                    };
                }

                function updateRenderedResult() {
                    var temp = vm.unitSystem;
                    console.log(temp);
                    vm.timezoneOffset =  $scope.timezoneOffset;
                    vm.renderResult = {};
                    angular.forEach(weatherData, function(value, key) {
                        if(vm.renderResult[key] !== weatherData[key]) vm.renderResult[key] = value;
                    });
                    convertToStandard(vm.renderResult);
                }

                function convertToStandard(weatherResult) {
                    vm.renderResult.temperatureMin =
                    weatherService.convertToCelsius(weatherResult.temperatureMin);
                    vm.renderResult.temperatureMax =
                    weatherService.convertToCelsius(weatherResult.temperatureMax);
                    vm.renderResult.localtime =
                    weatherService.convertToDate(weatherResult.time);
                    vm.renderResult.precipitation =
                    weatherService.convertToPercentage(weatherResult.precipitation);
                }

                $scope.$watch('weather', function(){
                    updatedWeatherData();
                    updateRenderedResult();
                });

                $scope.$watch('unitSystem', function(){
                    console.log('wathcing unitSystem: ' + $scope.unitSystem);
                });

            }],
            controllerAs: 'daily'
        };
    }]);
})();
