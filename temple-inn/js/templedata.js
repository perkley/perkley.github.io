let templeInfoContainer = document.querySelector('div#templeInfoContainer');

let requestURL = 'https://perkley.github.io/temple-inn/json/temples.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    let templeData = request.response;
    showTempleData(templeData);
}


// var townDataFound = {preston:0, sodaSprings:0, fishHaven:0};
// var townNamesIncluded = ['preston', 'soda springs', 'fish haven'];

function showTempleData(jsonObj) {
    let temples = jsonObj['temples'];
    let summaryOnly = templeInfoContainer.getAttribute("data-summary-only");
    summaryOnly = (summaryOnly == 'undefined') ? false : summaryOnly;
    let dataLimit = templeInfoContainer.getAttribute("data-limit");
    dataLimit = (dataLimit != 'undefined') ? dataLimit : -1;  //-1 means all
    // var regexTowns = new RegExp(townNamesIncluded[0] + "|" + townNamesIncluded[1] + "|" + townNamesIncluded[2]);

    if (dataLimit == 1) {
        let min = 0; 
        let max = temples.length - 1;  
        var random = Math.floor(Math.random() * (+max - +min)) + +min; 
    }

    if (dataLimit == 1) {
        //Show a random temple information
        createTempleInfo(temples, random, summaryOnly);
    } else {
        for (let i = 0; i < temples.length; i++) {
            createTempleInfo(temples, i, summaryOnly);
            // let temple = temples[i].city + " " + temples[i].state;
            // if (!regexTowns.test(townName)) {
            //     continue;
            // }

            // console.log(temple);
            // console.log(summaryOnly);
            // console.log(dataLimit);
            //createDataArticle(towns, townName, i); 
        }
    }

    // for (x in townDataFound) {
    //     if (townDataFound[x] == 0) {
    //         createDataArticle(towns, x, -1);
    //     }
    // }
}

function createTempleInfo(temples, idx, summaryOnly) {
    let templeInfoArticle = document.createElement('article');
    let titleH2 = document.createElement('h2');
    let templePicture = document.createElement('picture');
    
    let templeImg = document.createElement('img');

    titleH2.textContent = temples[idx].city + " " + temples[idx].state + " Temple";

    for (let i = 0; i < temples[idx].images.length; i++) {
        let templeSource = document.createElement('source');
        templeSource.media = "(max-width: 320px)";
        console.log(temples[idx].images[i]);
        templeSource.srcset = "images/" + temples[idx].images[i];
        templePicture.appendChild(templeSource);
    }


    templeInfoArticle.appendChild(titleH2);
    templeInfoArticle.appendChild(templePicture);
    templeInfoContainer.appendChild(templeInfoArticle);


    // <picture>
    //     <source media="(max-width: 320px)" srcset="images/rexburg-temple-320w.jpg">
    //     <source media="(max-width: 675px)" srcset="images/rexburg-temple-635w.jpg">
    //     <img src="images/rexburg-temple-320w.jpg" alt="Married couple in front of the Rexburg Idaho Temple">
    // </picture>

    // let dataFound = (i > -1);
    // var townArticle = document.createElement('article');
    // var townFlexSection = document.createElement('section');
    // var townDivName = document.createElement('div');
    // var townDivImage = document.createElement('div');
    // var townH2 = document.createElement('h2');
    // var townMotto = document.createElement('em');
    // var townInfoContainer = document.createElement('div');
    // var tdi_year = document.createElement('div');
    // var tdi_year_value = document.createElement('div');
    // var tdi_population = document.createElement('div');
    // var tdi_population_value = document.createElement('div');
    // var tdi_annualRainFall = document.createElement('div');
    // var tdi_annualRainFall_value = document.createElement('div');
    // var townImage = document.createElement('img');
    
    
    // townFlexSection.classList.add('towndata-flex');    

    // townH2.textContent = dataFound ? towns[i].name : townName;
    // townMotto.textContent = dataFound ? towns[i].motto : "Our apologies, no information was found!";
    // townMotto.classList.add('author');
    // townInfoContainer.classList.add('towndata-info');
    
    // tdi_year.textContent = 'Year Founded:';
    // tdi_year.classList.add('tdi_year');
    // tdi_year_value.textContent = dataFound ? towns[i].yearFounded : "X";
    // tdi_year_value.classList.add('tdi_year_value');
    // townInfoContainer.appendChild(tdi_year);
    // townInfoContainer.appendChild(tdi_year_value);

    // tdi_population.textContent = 'Population:';
    // tdi_population.classList.add('tdi_population');
    // tdi_population_value.textContent = dataFound ? towns[i].currentPopulation : "X";
    // tdi_population_value.classList.add('tdi_population_value');
    // townInfoContainer.appendChild(tdi_population);
    // townInfoContainer.appendChild(tdi_population_value);

    // tdi_annualRainFall.textContent = 'Annual Rain Fall:';
    // tdi_annualRainFall.classList.add('tdi_annualRainFall');
    // tdi_annualRainFall_value.textContent = dataFound ? towns[i].averageRainfall : "X";
    // tdi_annualRainFall_value.classList.add('tdi_annualRainFall_value');
    // townInfoContainer.appendChild(tdi_annualRainFall);
    // townInfoContainer.appendChild(tdi_annualRainFall_value);
    
    // if (townName == townNamesIncluded[0]) {
    //     townDataFound.preston = 1;
    //     townImage.src = "images/town-preston.jpg";
    //     townImage.alt = "Preston City Picture";
    // } else if (townName == townNamesIncluded[1]) {
    //     townDataFound.sodaSprings = 1;
    //     townImage.src = "images/town-sodasprings.jpg";
    //     townImage.alt = "Soda Springs City Picture";
    // } else if (townName == townNamesIncluded[2]) {
    //     townDataFound.fishHaven = 1;
    //     townImage.src = "images/town-fishhaven.jpg";
    //     townImage.alt = "Fish Haven City Picture";
    // } else {
    //     townImage.src = "images/town-missing.jpg";
    //     townImage.alt = "Missing City Info Default Picture";
    // }

    
    // townDivName.appendChild(townH2);
    // townDivName.appendChild(townMotto);

    // townDivImage.appendChild(townInfoContainer);
    // townDivImage.appendChild(townImage);

    // townFlexSection.appendChild(townDivName);
    // townFlexSection.appendChild(townDivImage);

    // townArticle.appendChild(townFlexSection);

    // townDataContainer.appendChild(townArticle);
}