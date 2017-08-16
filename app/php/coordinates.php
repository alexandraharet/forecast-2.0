<?php
// api at https://developers.google.com/maps/documentation/geocoding/start
// max 2,500 requests per day, 50 requests per second
// object example CITY ONLY: https://maps.googleapis.com/maps/api/geocode/json?address=Bucharest&key=api_key
// object exaple FULL ADDRESS: https://maps.googleapis.com/maps/api/geocode/json?address=Siret+6%2C+Barlad%2C+Romania&key=api_key

include('api-keys.php');

$api_maps = 'https://maps.googleapis.com/maps/';
$address = urlencode($_GET['address']);
$api_key = $googlegeocodekey;
$url = $api_maps . 'api/geocode/json?address=' . $address . '&key=' . $api_key;
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$curl_response = curl_exec($curl);
curl_close($curl);
echo ($curl_response);

// $decodedresponse = json_decode($curl_response);

//send me what var_dump return so I can hellp you accessing the array!
// echo var_dump($decodedresponse);

?>
