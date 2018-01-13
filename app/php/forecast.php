<?php
// api at https://darksky.net/dev/docs
// max 1000 calls per day
// object example: https://api.darksky.net/forecast/api_key/55.9533,3.1883
// object example with EXCLUDE: https://api.darksky.net/forecast/api_key/55.9533,3.1883?exclude=minutely,daily,flags

include('api-keys.php');

$api_weather = 'https://api.darksky.net/forecast/';
$api_key = $darkskykey;
$lat = $_GET['lat'];
$lon = $_GET['lon'];

$url = $api_weather . $api_key . '/' . $lat . ',' . $lon . '?exclude=minutely,flags' ;
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$curl_response = curl_exec($curl);
curl_close($curl);

echo ($curl_response);

?>
