let br = '<br>';
let tStr = '';

let requestURL = 'https://perkley.github.io/temple-inn/json/temples.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    let templeData = request.response;
    console.log(templeData);
    showTempleData(templeData);
}

function showTempleData(jsonObj) {
    let temples = jsonObj['temples'];
    let summaryOnly = templeInfoContainer.getAttribute("data-summary-only");
    summaryOnly = (summaryOnly == 'undefined') ? false : (summaryOnly=='true') ? true : false;
    let dataLimit = templeInfoContainer.getAttribute("data-limit");
    dataLimit = (dataLimit != 'undefined') ? dataLimit : -1;  //-1 means all

    if (dataLimit == 1) {
        //Show a random temple information
        let min = 0; 
        let max = temples.length;  
        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        createTempleInfo(temples, random, summaryOnly);
    } else {
        for (let i = 0; i < temples.length; i++) {
            createTempleInfo(temples, i, summaryOnly);
        }
    }
}

function createTempleInfo(temples, idx, summaryOnly) {

    let templeInfoContainer = (summaryOnly) ? document.querySelector('#templeInfoContainer') : document.querySelector('.temple-detail-container');          

// ******** CREATE "TEMPLE TITLE" DIV ************************
    let tDivTitle = document.createElement('div');
    tDivTitle.setAttribute("class", "temple-title");
    let tH2Title = document.createElement('h2');

    tH2Title.textContent = temples[idx].address.city + " " + temples[idx].address.state + " Temple";
    tDivTitle.appendChild(tH2Title);


// ******** CREATE "TEMPLE INFO" DIV ************************
    let tDivInfo = document.createElement('div');
    tDivInfo.setAttribute("class", "temple-info");

    //Address
    // let tStrongAddr = document.createElement('strong');
    // tStrongAddr.textContent = "Address";
    // tDivInfo.appendChild(tStrongAddr);
    
    let tPAddr = document.createElement('p');
    tPAddr.innerHTML =  "<strong>Address</strong>" + br + temples[idx].address.street + br +
        temples[idx].address.city + ' ' + temples[idx].address.state_abbr + ' ' + temples[idx].address.postal + br +
        temples[idx].address.country;
    tDivInfo.appendChild(tPAddr);

    //Phone
    // let tStrongPhone = document.createElement('strong');
    // tStrongPhone.textContent = "Telephone";
    // tDivInfo.appendChild(tStrongPhone);
    
    let tPPhone = document.createElement('p');
    tPPhone.innerHTML =  "<strong>Telephone</strong>" + br + temples[idx].phone;
    tDivInfo.appendChild(tPPhone);

    //Email
    // let tStrongEmail = document.createElement('strong');
    // tStrongEmail.textContent = "Email";
    // tDivInfo.appendChild(tStrongEmail);
    
    let tPEmail = document.createElement('p');
    tPEmail.innerHTML =  "<strong>Email</strong>" + br + temples[idx].email;
    tDivInfo.appendChild(tPEmail);

    //Services
    // let tStrongServices = document.createElement('strong');
    // tStrongServices.textContent = "Services";
    // tDivInfo.appendChild(tStrongServices);
    
    let tPServices = document.createElement('p');
    tStr = '';
    for (s=0; s < temples[idx].services.length; s++) {
        tStr += temples[idx].services[s].service + br;
    }
    tPServices.innerHTML =  "<strong>Services</strong>" + br + tStr;
    tDivInfo.appendChild(tPServices);




// ******** CREATE "TEMPLE PIC" DIV ************************
    let tDivPic = document.createElement('div');
    tDivPic.setAttribute("class", "temple-pic");
    let tPic = document.createElement('picture');
    let tPicSrcSmall = document.createElement('source');
    let tPicSrcLarge = document.createElement('source');
    let tPicImg = document.createElement('img');

    tPicSrcSmall.media = "(max-width: 320px)";
    tPicSrcSmall.srcset = "images/" + temples[idx].images.small;

    tPicSrcLarge.media = "(max-width: 675px)";
    tPicSrcLarge.srcset = "images/" + temples[idx].images.large;

    tPicImg.src = "images/" + temples[idx].images.small;
    tPicImg.alt = temples[idx].images.image_description;

    tPic.appendChild(tPicSrcSmall);
    tPic.appendChild(tPicSrcLarge);
    tPic.appendChild(tPicImg);
    tDivPic.appendChild(tPic);



// ******** CREATE "TEMPLE SUMMARY" DIV ************************
    let tDivSummary = document.createElement('div');
    tDivSummary.setAttribute("class", "temple-summary");

    let tPWeather = document.createElement('p');
    tPWeather.setAttribute("class", "temple-weather");
    getTempleCityWeather(temples[idx].openweathermap_cityid, tDivSummary, tPWeather);
    // console.log(tSpanTemp);




// ******** CREATE "TEMPLE DETAIL" DIV ************************
    let tDivDetail = document.createElement('div');
    tDivDetail.setAttribute("class", "temple-detail");

    //Ordinances
    let tH3Ordinance = document.createElement('h3');
    tH3Ordinance.textContent = "Ordinance Schedules";
    tDivDetail.appendChild(tH3Ordinance);

    //Ordinance: Baptism
    // let tStrongBaptistryGroup = document.createElement('strong');
    // tStrongBaptistryGroup.textContent = br + "Baptistry Schedule";
    // tDivDetail.appendChild(tStrongBaptistryGroup);

    let tPBaptistry = document.createElement('p');
    // let tEmBaptistryGroups = document.createElement('em');
    // tEmBaptistryGroupsinnerHTML =  "<strong>Baptistry Schedule</strong>" + br + " Church Groups";
    // tDivDetail.appendChild(tEmBaptistryGroups);

    tStr = '';
    let jBaptGroup = temples[idx].ordinance_schedule.baptism.church_groups;
    for (s=0; s < jBaptGroup.length; s++) {
        tStr += jBaptGroup[s].time_from + ' - ' + jBaptGroup[s].time_to +
            ' - ' + jBaptGroup[s].info + br;
    }
    tPBaptistry.innerHTML =  "<strong>Baptistry Schedule</strong> <em>Church Groups</em>" + br + tStr;
    tDivDetail.appendChild(tPBaptistry);

    // let tStrongBaptistryFamily = document.createElement('strong');
    // tStrongBaptistryFamily.textContent = br + "Baptistry Schedule";
    // tDivDetail.appendChild(tStrongBaptistryFamily);

    // let tEmBaptistryFamily = document.createElement('em');
    // tEmBaptistryFamily.textContent = " Family Priority Time";
    // tDivDetail.appendChild(tEmBaptistryFamily);

    let tPBaptistryF = document.createElement('p');
    tStr = '';
    let jBaptFamily = temples[idx].ordinance_schedule.baptism.family_priority_time;
    for (s=0; s < jBaptFamily.length; s++) {
        tStr += jBaptFamily[s].time_from + ' - ' + jBaptFamily[s].time_to +
            ' - ' + jBaptFamily[s].info + br;
    }
    tPBaptistryF.innerHTML =  "<strong>Baptistry Schedule</strong> <em>Family Priority Time</em>" + br + tStr;
    tDivDetail.appendChild(tPBaptistryF);
    
    //Ordinance: Initiatory
    // let tStrongInitiatory = document.createElement('strong');
    // tStrongInitiatory.textContent = br + "Initiatory Schedule";
    // tDivDetail.appendChild(tStrongInitiatory);

    let tPInitiatory = document.createElement('p');
    tStr = '';
    let jInit = temples[idx].ordinance_schedule.initiatory;
    for (s=0; s < jInit.length; s++) {
        tStr += jInit[s].time_from + ' - ' + jInit[s].time_to +
            ' - ' + jInit[s].info + br;
    }
    tPInitiatory.innerHTML =  "<strong>Initiatory Schedule</strong>" + br + tStr;
    tDivDetail.appendChild(tPInitiatory);

    //Ordinance: Endowment
    // let tStrongEndowment = document.createElement('strong');
    // tStrongEndowment.textContent = br + "Endowment Schedule";
    // tDivDetail.appendChild(tStrongEndowment);

    let tPEndowment = document.createElement('p');
    tStr = '';
    let jEnd = temples[idx].ordinance_schedule.endowment;
    for (s=0; s < jEnd.length; s++) {
        tStr += jEnd[s].start_time + ' - ' + jEnd[s].info + br;
    }
    tPEndowment.innerHTML =  "<strong>Endowment Schedule</strong>" + br + tStr;
    tDivDetail.appendChild(tPEndowment);

    //Ordinance: Sealing
    // let tStrongSealing = document.createElement('strong');
    // tStrongSealing.textContent = br + "Sealing Schedule";
    // tDivDetail.appendChild(tStrongSealing);

    let tPSealing = document.createElement('p');
    tStr = '';
    let jSeal = temples[idx].ordinance_schedule.sealing;
    for (s=0; s < jSeal.length; s++) {
        tStr += jSeal[s].time_from + ' - ' + jSeal[s].time_to +
            ' - ' + jSeal[s].info + br;
    }
    tPSealing.innerHTML =  "<strong>Sealing Schedule</strong>" + br + tStr;
    tDivDetail.appendChild(tPSealing);
    

    //Temple Closures
    let tH3Closures = document.createElement('h3');
    tH3Closures.textContent = "Temple Closures";
    tDivDetail.appendChild(tH3Closures);

    tStr = '';
    let jClosureYear = temples[idx].closures;
    for (s=0; s < jClosureYear.length; s++) {
        //Output the Year
        let tH4ClosureYear = document.createElement('h4');
        tH4ClosureYear.textContent = jClosureYear[s].year;
        tDivDetail.appendChild(tH4ClosureYear);

        let tULClosures = document.createElement('ul');

        //Get the Listings
        tStr = '';
        let jClosureData = jClosureYear[s].closed;
        let tPClosure = document.createElement('p');
        let tLIClosure = [];
        for (c=0; c < jClosureData.length; c++) {
            tLIClosure[c] = document.createElement('li'); 
            tStr = jClosureData[c].date_from + ' - ' + jClosureData[c].date_to;
            tLIClosure[c].textContent = tStr;
            tULClosures.appendChild(tLIClosure[c]);
        }
        tPClosure.appendChild(tULClosures);
        tDivDetail.appendChild(tPClosure);
        
    }


    //Milestones
    let tH3Milestones = document.createElement('h3');
    tH3Milestones.textContent = "Milestones";
    tDivDetail.appendChild(tH3Milestones);

    let tPMileStones = document.createElement('p');
    tStr = '';
    let jMile = temples[idx].milestones;
    for (s=0; s < jMile.length; s++) {
        tStr += jMile[s].date + ' - ' + jMile[s].title;
        if (jMile[s].url_title != '') {
            if (jMile[s].url != '') {
                tStr += ' - <a href="'+ jMile[s].url +'" target="_blank">'+ jMile[s].url_title +'</a>';
            } else tStr += ' - ' + jMile[s].url_title;
        }
            
        tStr += br;

    }
    tPMileStones.innerHTML = tStr;
    tDivDetail.appendChild(tPMileStones);


// ******** ADD DIV SECTIONS TO CONTAINER ************************
    templeInfoContainer.appendChild(tDivTitle);
    templeInfoContainer.appendChild(tDivInfo);
    templeInfoContainer.appendChild(tDivPic);
    templeInfoContainer.appendChild(tDivSummary);
    templeInfoContainer.appendChild(tDivDetail);


    return;


    titleH2.textContent = temples[idx].address.city + " " + temples[idx].address.state + " Temple";

    templeSourceSmall.media = "(max-width: 320px)";
    templeSourceSmall.srcset = "images/" + temples[idx].images.small;

    templeSourceLarge.media = "(max-width: 675px)";
    templeSourceLarge.srcset = "images/" + temples[idx].images.large;

    templeImg.src = "images/" + temples[idx].images.small;
    templeImg.alt = temples[idx].image_description;


    //Create the picture tag
    templePicture.appendChild(templeSourceSmall);
    templePicture.appendChild(templeSourceLarge);
    templePicture.appendChild(templeImg);

    //Output main sections to the div
    templeInfoArticle.appendChild(titleH2);
    templeInfoArticle.appendChild(templePicture);
    templeInfoContainer.appendChild(templeInfoArticle);


    
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

function getTempleCityWeather(cityID, parentObjElement, objElement) {
    // let weatherRequest = new XMLHttpRequest();
    // let apiURLstring = 'https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&units=imperial&APPID=66f6d6a1e23693c441db2a9ca11bd964'
    // weatherRequest.open('Get', apiURLstring, true);
    // weatherRequest.send();

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4){
            // document.getElementById('result').innerHTML = xhr.responseText;
            let weatherData = JSON.parse(xhr.responseText);
            //console.log(weatherData);
            
            // let tStrongWeather = document.createElement('strong');
            // tStrongWeather.textContent = br + "Current Weather" + br;
            // parentObjElement.appendChild(tStrongWeather);

            let tStr = weatherData.main.temp + "\u00B0 F - " +
                weatherData.weather[0].description;
            objElement.innerHTML =  "<strong>Current Weather</strong>" + br + tStr;
            parentObjElement.appendChild(objElement);
        }
    };
    xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&units=imperial&APPID=66f6d6a1e23693c441db2a9ca11bd964');
    xhr.send();

    // request.onload = function() {
        // let templeData = request.response;
        //showTempleData(templeData);
        // let weatherData = JSON.parse(weatherRequest.responseText);
        // console.log(weatherData);

    // document.getElementById('cc-temp').innerHTML = weatherData.main.temp;
    // }
    // let weatherData = JSON.parse(weatherRequest.responseText);
    // console.log(weatherData);

    // document.getElementById('cc-temp').innerHTML = weatherData.main.temp;

    // let desc = weatherData.weather[0].description;
    // let icon = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";

    // document.getElementById("cc-img").setAttribute("src", icon);
    // document.getElementById("cc-img").setAttribute("alt", desc);

    //return weatherData.main.temp;
}