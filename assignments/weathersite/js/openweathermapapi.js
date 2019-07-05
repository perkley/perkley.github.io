let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let townId = document.getElementById("openweathermapapi").getAttribute("data-town-id");

let weatherRequest = new XMLHttpRequest();
let apiURLstring = 'https://api.openweathermap.org/data/2.5/weather?id='+townId+'&units=imperial&APPID=66f6d6a1e23693c441db2a9ca11bd964';
weatherRequest.open('Get', apiURLstring, true);
weatherRequest.send();

let forecastRequest = new XMLHttpRequest();
apiURLstring = 'https://api.openweathermap.org/data/2.5/forecast?id='+townId+'&units=imperial&APPID=66f6d6a1e23693c441db2a9ca11bd964';
forecastRequest.open('Get', apiURLstring, true);
forecastRequest.send();

// Used this for testing so not using up calls available
// var requestURL = 'https://perkley.github.io/assignments/lesson-10/weatherdata.json';
// var forecastRequest = new XMLHttpRequest();
// forecastRequest.open('GET', requestURL);
// forecastRequest.responseType = 'text';
// forecastRequest.send();

weatherRequest.onload = function () {
    let weatherData = JSON.parse(weatherRequest.responseText);
    console.log(weatherData);

    let desc = weatherData.weather[0].description;
    let highTemp = weatherData.main.temp_max;
    let windSpeed = weatherData.wind.speed;
    let windDeg = weatherData.wind.deg;
    let humidity = weatherData.main.humidity;
    
    document.getElementById('currentdesc').innerHTML = desc;
    document.getElementById('currenttemp').innerHTML = highTemp;
    document.getElementById('currenthumidity').innerHTML = humidity;
    document.getElementById('windspeed').innerHTML = windSpeed;
    document.getElementById("windDegree").style.transform = "rotate(" + windDeg + "deg)";

    //Update area on webpage with calculated wind chill
    document.getElementById("windchill").innerHTML = calcWindChill(windSpeed, highTemp).toFixed(0); 
}

forecastRequest.onload = function () {
    //5 Day Forecast
    let forecastData = JSON.parse(forecastRequest.responseText);

    //Test for error back and populate with No Data
    if (forecastData.cod != 200) {
        var today = new Date();
        for (i=1; i<=5; i++) {
            populateForecast(i, today, "", "No Data", "ERR");
            today.setDate(today.getDate() + 1); 
        }
        console.log(forecastData);

        return;
    }

    let list = forecastData['list'];
    let sDate = "";
    let splitDate;
    let fDate;
    let dayCount = 1;
    for (x in list) {
        // Get String, Example: "2019-06-22 18:00:00"
        sDate = list[x].dt_txt;
        if (sDate.indexOf("18:00:00") > 0) {
            sDate = sDate.split(" ");
            splitDate = sDate[0].split("-");
 
            //Create the date from string
            fDate = new Date(splitDate[0], splitDate[1]-1, splitDate[2]-1);
            let fTemp = list[x].main.temp.toFixed(0);
            let fIcon = "http://openweathermap.org/img/w/" + list[x].weather[0].icon + ".png";
            let fAlt = list[x].weather[0].description;
            
            populateForecast(dayCount, fDate, fIcon, fAlt, fTemp);

            dayCount++;
        }
    }

}

function calcWindChill(windSpeed, avgTemp) {
    let windChill = 35.74 + 0.6215 * avgTemp - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * avgTemp * Math.pow(windSpeed, 0.16);  
    
    return windChill;
}

function populateForecast(dayCount, fDate, fImgIcon, fImgAlt, fTemp) {
    if (dayCount == 1) {
        document.getElementById("todayTemp").innerHTML = fTemp;
        document.getElementById("todayImg").setAttribute("src", fImgIcon);
        document.getElementById("todayImg").setAttribute("alt", fImgAlt);
    }

    document.getElementById("forecast" + dayCount + "h").innerHTML = daysOfWeek[fDate.getDay()];
    document.getElementById("imgForecast" + dayCount).setAttribute("src", fImgIcon);
    document.getElementById("imgForecast" + dayCount).setAttribute("alt", fImgAlt);
    document.getElementById("forecastTemp" + dayCount).innerHTML = fTemp;
}