// services

weatherApp.service('addressService', ['$resource', function($resource) {
    this.address = "Bucharest, Romania";
    this.getLatLong = function(address) {
        var getCoordinates = $resource('https://maps.googleapis.com/maps/api/geocode/json:params', {get:{method:'JSONP'}});
        return getCoordinates.get({ address: address, key: 'AIzaSyBvzrK2_Fr84Od185gbDGxlpRapNcJE4BY'});
    }
}]);


weatherApp.service('weatherService', ['$resource', function($resource) {
    this.getWeather = function(lat, lon) {
        var weatherAPI = $resource('https://api.darksky.net/forecast/2cb2a6600011ce4ca629efa9e07cc9bd/:latlong', {jsonpCallbackParam: 'callback'}, {get:{method:'JSONP'}});
        return weatherAPI.get({latlong: lat+","+lon, exclude: 'minutely,daily,flags'});
    }
}]);


weatherApp.service('timeframeService', ['$scope', function($scope) {
    this.timeframe = "24h";
    this.changeTimeframe = function(timeframe){

    }
}]);
