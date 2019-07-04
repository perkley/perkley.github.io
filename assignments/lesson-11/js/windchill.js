//Gather data from webpage
let windSpeed = document.getElementById("windspeed").innerHTML;
let currentTemp = document.getElementById("currenttemp").innerHTML;

//Update area on webpage with calculated wind chill
document.getElementById("windchill").innerHTML = calcWindChill(windSpeed, currentTemp).toFixed(0);

function calcWindChill(windSpeed, avgTemp) {
    let windChill = 35.74 + 0.6215 * avgTemp - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * avgTemp * Math.pow(windSpeed, 0.16);  
    
    return windChill;
}