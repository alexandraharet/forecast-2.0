<?php
// api at https://developers.google.com/maps/documentation/geocoding/start
// max 2,500 requests per day, 50 requests per second
// object example CITY ONLY: https://maps.googleapis.com/maps/api/geocode/json?address=Bucharest&key=api_key
// object exaple FULL ADDRESS: https://maps.googleapis.com/maps/api/geocode/json?address=Siret+6%2C+Barlad%2C+Romania&key=api_key

include('api-keys.php');

$api_timezone = 'https://maps.googleapis.com/maps/';
$lat = $_GET['lat'];
$lon = $_GET['lon'];
$timestamp = $_GET['timestamp'];

$api_key = $googlegeocodekey;
$url = $api_timezone . 'api/timezone/json?location=' . $lat . ','. $lon . '&timestamp='  . $timestamp . '&key=' . $api_key;
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$curl_response = curl_exec($curl);
curl_close($curl);
echo ($curl_response);

?>
