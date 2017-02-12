// directives

weatherApp.directive("weatherReportHourly", function() {
    return {
        restrict: "E",
        templateUrl: "templates/weatherReportHourly.html",
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

weatherApp.directive("weatherReportDaily", function() {
    return {
        restrict: "E",
        templateUrl: "templates/weatherReportDaily.html",
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
