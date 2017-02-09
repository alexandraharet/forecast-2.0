// module

var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// config

weatherApp.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    .when('/:days', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    .when('/:days', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    .when('/:days', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    });

    // enable html5Mode for pushstate ('#'-less URLs)
    $locationProvider.html5Mode({
        enable: true,
        requireBase: false});
    $locationProvider.hashPrefix('');

    $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://api.darksky.net/forecast/**',
    'https://maps.googleapis.com/maps/**'
  ]);

}]);
