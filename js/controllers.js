// controllers

weatherApp.controller('homeController', ['$scope', '$location', 'addressService', 'weatherService', function($scope, $location, addressService, weatherService) {
    $scope.address = addressService.address;
    $scope.$watch("address", function (newValue) {
        addressService.address = $scope.address;
        console.log("Watched! $scope.address is " + $scope.address);
    });
    $scope.submit = function() {
        $scope.submitted = true;
        addressService.getLatLong($scope.address).$promise
        .then(function(data) {
            console.log($scope.address);
            $scope.formattedAddress = function() {
                return (data.results["0"].formatted_address);
            }
            $scope.lat = data.results[0].geometry.location.lat;
            $scope.lon = data.results[0].geometry.location.lng;
            $scope.weatherResult = weatherService.getWeather($scope.lat, $scope.lon);
        });
    }

}]);

weatherApp.controller('forecastController', ['$scope', '$route', 'addressService', 'weatherService', function($scope, $route, addressService, weatherService) {


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



// not used
/*
weatherApp.controller('timeframeController', ['$scope', 'addressService', function($scope, addressService) {

$scope.timeframe = "24h";
$scope.changeTimeframe = function(t){
$scope.timeframe = t;
return $scope.timeframe;
}
}])
*/
