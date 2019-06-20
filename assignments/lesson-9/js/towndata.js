var section = document.querySelector('section.towndata-container');

var requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    var townData = request.response;
    showTownData(townData);
}


var townDataFound = {preston:0, sodaSprings:0, fishHaven:0};
var townNamesIncluded = ['preston', 'soda springs', 'fish haven'];

function showTownData(jsonObj) {
    var towns = jsonObj['towns'];
 
    var regexTowns = new RegExp(townNamesIncluded[0] + "|" + townNamesIncluded[1] + "|" + townNamesIncluded[2]);

    for (var i = 0; i < towns.length; i++) {
        
        var townName = towns[i].name.toLowerCase();
        if (!regexTowns.test(townName)) {
            continue;
        }

        createDataArticle(towns, townName, i); 
    }

    for (x in townDataFound) {
        if (townDataFound[x] == 0) {
            createDataArticle(towns, x, -1);
        }
    }
}

function createDataArticle(towns, townName, i) {
    let dataFound = (i > -1);
    var townArticle = document.createElement('article');
    var townFlexSection = document.createElement('section');
    var townDivName = document.createElement('div');
    var townDivImage = document.createElement('div');
    var townH2 = document.createElement('h2');
    var townMotto = document.createElement('em');
    var townInfoContainer = document.createElement('div');
    var tdi_year = document.createElement('div');
    var tdi_year_value = document.createElement('div');
    var tdi_population = document.createElement('div');
    var tdi_population_value = document.createElement('div');
    var tdi_annualRainFall = document.createElement('div');
    var tdi_annualRainFall_value = document.createElement('div');
    var townImage = document.createElement('img');
    
    
    townFlexSection.classList.add('towndata-flex');    

    townH2.textContent = dataFound ? towns[i].name : townName;
    townMotto.textContent = dataFound ? towns[i].motto : "Our apologies, no information was found!";
    townMotto.classList.add('author');
    townInfoContainer.classList.add('towndata-info');
    
    tdi_year.textContent = 'Year Founded:';
    tdi_year.classList.add('tdi_year');
    tdi_year_value.textContent = dataFound ? towns[i].yearFounded : "X";
    tdi_year_value.classList.add('tdi_year_value');
    townInfoContainer.appendChild(tdi_year);
    townInfoContainer.appendChild(tdi_year_value);

    tdi_population.textContent = 'Population:';
    tdi_population.classList.add('tdi_population');
    tdi_population_value.textContent = dataFound ? towns[i].currentPopulation : "X";
    tdi_population_value.classList.add('tdi_population_value');
    townInfoContainer.appendChild(tdi_population);
    townInfoContainer.appendChild(tdi_population_value);

    tdi_annualRainFall.textContent = 'Annual Rain Fall:';
    tdi_annualRainFall.classList.add('tdi_annualRainFall');
    tdi_annualRainFall_value.textContent = dataFound ? towns[i].averageRainfall : "X";
    tdi_annualRainFall_value.classList.add('tdi_annualRainFall_value');
    townInfoContainer.appendChild(tdi_annualRainFall);
    townInfoContainer.appendChild(tdi_annualRainFall_value);
    
    if (townName == townNamesIncluded[0]) {
        townDataFound.preston = 1;
        townImage.src = "images/town-preston.jpg";
        townImage.alt = "Preston City Picture";
    } else if (townName == townNamesIncluded[1]) {
        townDataFound.sodaSprings = 1;
        townImage.src = "images/town-sodasprings.jpg";
        townImage.alt = "Soda Springs City Picture";
    } else if (townName == townNamesIncluded[2]) {
        townDataFound.fishHaven = 1;
        townImage.src = "images/town-fishhaven.jpg";
        townImage.alt = "Fish Haven City Picture";
    } else {
        townImage.src = "images/town-missing.jpg";
        townImage.alt = "Missing City Info Default Picture";
    }

    
    townDivName.appendChild(townH2);
    townDivName.appendChild(townMotto);

    townDivImage.appendChild(townInfoContainer);
    townDivImage.appendChild(townImage);

    townFlexSection.appendChild(townDivName);
    townFlexSection.appendChild(townDivImage);

    townArticle.appendChild(townFlexSection);

    section.appendChild(townArticle);
}