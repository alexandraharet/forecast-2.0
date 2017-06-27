// controllers

weatherApp.controller('homeController', ['$scope', '$location', 'addressService', 'weatherService', function($scope, $location, addressService, weatherService) {
    $scope.address = addressService.address;
    $scope.$watch("address", function () {
        addressService.address = $scope.address;
    });

    $scope.submit = function() {
        $scope.submitted = false;
        setTimeout(function() {
            $scope.submitted = true;
            addressService.getLatLong($scope.address).$promise
            .then(function(data) {
                $scope.formattedAddress = function() {
                    return (data.results["0"].formatted_address);
                }
                $scope.lat = data.results[0].geometry.location.lat;
                $scope.lon = data.results[0].geometry.location.lng;
                $scope.weatherResult = weatherService.getWeather($scope.lat, $scope.lon);
            });
        }, 300);
    }

}]);

weatherApp.controller('forecastController', ['$scope', function($scope) {

    $scope.convertToCelsius = function(Fah) {
        if(Fah)
            return Math.round((Fah - 32)/1.8);
        else
            return null;
    }

    $scope.convertToDate = function(time) {
        if(time)
            return new Date(time * 1000);
        else
            return null;
    }

    $scope.convertToPercentage = function(num) {
        if(num)
            return Math.round(num * 100);
        else
            return null;
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
