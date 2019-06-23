var townEventContainer = document.querySelector('div#events-container');

var requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    var townData = request.response;
    showEvents(townData);
}

function showEvents(jsonObj) {
    var towns = jsonObj['towns'];
    var townDataFound = 0;
    var town = document.getElementById("townevents").getAttribute("data-town");

    for (var i = 0; i < towns.length; i++) {
        
        var townName = towns[i].name.toLowerCase();
        if (town != townName) {
            continue;
        }

        townDataFound = 1;
        populateEvents(towns, i); 
    }

    if (townDataFound == 0) {
        populateEvents(towns, -1);
    }
}

function populateEvents(towns, i) {
    let dataFound = (i > -1);
    let events = dataFound ? towns[i].events : '';

    for (x=0; x < (dataFound ? events.length: 1); x++) {
        console.log(events[x]);

        let eventLine = dataFound ? events[x].split(":") : "Technical Difficulty";

        let eventDiv = document.createElement('div');
        let eventH3 = document.createElement('h3');
        let eventTitle = document.createElement('span');

        eventH3.textContent = dataFound ? eventLine[0] : eventLine;
        eventTitle.textContent = dataFound ? eventLine[1].trim() : "Unable to show events at this time!";

        eventDiv.appendChild(eventH3);
        eventDiv.appendChild(eventTitle);
        
        townEventContainer.appendChild(eventDiv);
    }
}