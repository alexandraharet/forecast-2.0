// controllers

weatherApp.controller('homeController', ['$scope', '$location', 'addressService', function($scope, $location, addressService) {
    $scope.address = addressService.address;
    $scope.$watch('address', function() {
        addressService.address = $scope.address;
    });
    $scope.submit = function() {
        $location.path("/forecast");
    }
}]);

weatherApp.controller('forecastController', ['$scope', '$route', 'addressService', 'weatherService', function($scope, $route, addressService, weatherService) {
    addressService.getLatLong(addressService.address).$promise
    .then(function(data) {
          $scope.formattedAddress = function() {
            return (data.results["0"].formatted_address);
          }
          $scope.lat = data.results[0].geometry.location.lat;
          $scope.lon = data.results[0].geometry.location.lng;
          $scope.weatherResult = weatherService.getWeather($scope.lat, $scope.lon);
          console.log($scope.weatherResult);
      });

    $scope.convertToCelsius = function(Fah) {
      return Math.round((Fah - 32)/1.8);
    }

    $scope.convertToDate = function(time) {
      return new Date(time * 1000);
    }

    $scope.convertToPercentage = function(num) {
      return Math.round(num * 100);
    }

}]);

weatherApp.controller('timeframeController', ['$scope', function($scope) {

    $scope.timeframe = "24h";
    $scope.changeTimeframe = function(t){
        $scope.timeframe = t;
        return $scope.timeframe;
    }

    $scope.$watch('timeframe', function(timeframe) {
        console.log(timeframe); // TODO: remove
    });



}])
