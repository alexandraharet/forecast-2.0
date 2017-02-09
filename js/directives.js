// directives

weatherApp.directive("weatherReport", function() {

    return {
        restrict: "E",
        templateUrl: "templates/weatherReport.html",
        replace: true,
        scope: {
            weatherResult: "=",
            convertToStandard: "&",
            convertToDate: "&",
            convertToPercentage: "&",
            dateFormat: "@",
            timeframe: "@"
        }
    }
});
