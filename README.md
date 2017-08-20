# forecast-2.0
Weather forecast app - rebuild from scratch as SPA using AngularJS and Boostrap 4.

The app uses makes use of three APIs:
    Google Geocoding API (https://developers.google.com/maps/documentation/geocoding/intro) to get the latitude & longitude from the address entered and to return the formatted address

    DarkSky API (https://darksky.net/dev/docs) called with the latitude and longitude, to get the weather data available for the location, as well as the timestamp for each data point rendered in the view.

    Google Timezone API (https://developers.google.com/maps/documentation/timezone/intro) is called last with the latitude and longitude provided by Geocoding in order to determine the timezone offset and render the times in view, in the local time of the searched for address.

As the solution get the weather based on latitde and longitude value, it can be used to return the forecast for an address as specific as you own flat! :)

View this project live at: alexandraharet.com/weather-forecast
