// angular
// .module('weatherApp')
// .directive("wfLocalTime", ['$interpolate',
// function($interpolate) {
//     return {
//         restrict: "E",
//         templateUrl: "templates/localTime.html",
//         scope: {
//             timezoneOffset: '='
//         },
//         link: function (scope, elm, attrs) {
//             var timezoneOffset = $interpolate(scope.timezoneOffset);
//             scope.timezoneOffset = timezoneOffset(scope);
//         },
//         controller: function($scope) {
//
//             var vm = this;
//             vm.timezoneOffset =  $scope.timezoneOffset;
//         }
//     };
// }]);
