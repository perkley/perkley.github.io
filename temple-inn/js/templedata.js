let br = '<br>';
let tStr = '';

let requestURL = 'https://perkley.github.io/temple-inn/json/temples.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    let templeData = request.response;
    // console.log(templeData);
    showTempleData(templeData);
}

function showTempleData(jsonObj) {
    let temples = jsonObj['temples'];
    let summaryOnly = templeInfoContainer.getAttribute("data-summary-only");
    summaryOnly = (typeof summaryOnly == 'undefined') ? false : (summaryOnly=='true') ? true : false;
    let dataLimit = templeInfoContainer.getAttribute("data-limit");
    dataLimit = (typeof dataLimit != 'undefined') ? dataLimit : -1;  //-1 means all

    if (getUrlParameter('tid')) {
        let templeId = getUrlParameter('tid');
        createTempleInfo(temples, templeId, false);
    } else if (dataLimit == 1) {
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

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function createTempleInfo(temples, idx, summaryOnly) {

    let templeInfoContainer = (summaryOnly) ? document.querySelector('.temple-summary-container') : document.querySelector('.temple-detail-container');          

// ******** ERROR MESSAGE - NO DATA FOUND ************************
    //If No Data Exists, then show ERROR message
    if (typeof temples[idx] == 'undefined') {
        console.log('ERROR: Data not found in temple JSON file.');
        let tDivTitle = document.createElement('div');
        tDivTitle.setAttribute("class", "temple-title");
        let tH2Title = document.createElement('h2');
        tH2Title.textContent = "Missing Data";
        tDivTitle.appendChild(tH2Title);

        let tPMissingData = document.createElement('p');
        tPMissingData.textContent = "Our apologies, but we can't find the temple information requested.  Please try another temple.";
        var tDivInfo = document.createElement('div');
        tDivInfo.setAttribute("class", "temple-info");
        tDivInfo.appendChild(tPMissingData);

        templeInfoContainer.appendChild(tDivTitle);
        templeInfoContainer.appendChild(tDivInfo);
        return;
    }

// ******** CREATE "TEMPLE TITLE" DIV ************************
    
    let tDivTitle = document.createElement('div');
    tDivTitle.setAttribute("class", "temple-title");
    let tH2Title = document.createElement('h2');   

    tH2Title.textContent = temples[idx].address.city + " " + temples[idx].address.state + " Temple";
    tDivTitle.appendChild(tH2Title);



// ******** CREATE "TEMPLE INFO" DIV ************************
    if (!summaryOnly) {    
        var tDivInfo = document.createElement('div');
        tDivInfo.setAttribute("class", "temple-info");

        //Address
        let tPAddr = document.createElement('p');
        tPAddr.innerHTML =  "<strong>Address</strong>" + br + temples[idx].address.street + br +
            temples[idx].address.city + ' ' + temples[idx].address.state_abbr + ' ' + temples[idx].address.postal + br +
            temples[idx].address.country;
        tDivInfo.appendChild(tPAddr);

        //Phone
        let tPPhone = document.createElement('p');
        tPPhone.innerHTML =  "<strong>Telephone</strong>" + br + temples[idx].phone;
        tDivInfo.appendChild(tPPhone);

        //Email
        let tPEmail = document.createElement('p');
        tPEmail.innerHTML =  "<strong>Email</strong>" + br + temples[idx].email;
        tDivInfo.appendChild(tPEmail);

        //Services
        let tPServices = document.createElement('p');
        tStr = '';
        for (s=0; s < temples[idx].services.length; s++) {
            tStr += temples[idx].services[s].service + br;
        }
        tPServices.innerHTML =  "<strong>Services</strong>" + br + tStr;
        tDivInfo.appendChild(tPServices);
    }



// ******** CREATE "TEMPLE PIC" DIV ************************
    let tDivPic = document.createElement('div');
    tDivPic.setAttribute("class", "temple-pic");
    let tPic = document.createElement('picture');
    let tPicSrcSmall = document.createElement('source');
    let tPicSrcLarge = document.createElement('source');
    let tPicImg = document.createElement('img');

    tPicSrcSmall.media = "(max-width: 320px)";
    tPicSrcSmall.srcset = "images/temples/" + temples[idx].images.small;

    tPicSrcLarge.media = "(max-width: 675px)";
    tPicSrcLarge.srcset = "images/temples/" + temples[idx].images.large;

    tPicImg.src = "images/temples/" + temples[idx].images.small;
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




// ******** CREATE "TEMPLE DETAIL" DIV ************************
    if (!summaryOnly) {
        var tDivDetail = document.createElement('div');
        tDivDetail.setAttribute("class", "temple-detail");

        //Ordinances
        let tH3Ordinance = document.createElement('h3');
        tH3Ordinance.textContent = "Ordinance Schedules";
        tDivDetail.appendChild(tH3Ordinance);

        //Ordinance: Baptism
        //Church Groups
        let tPBaptistry = document.createElement('p');
        tStr = '';
        let jBaptGroup = temples[idx].ordinance_schedule.baptism.church_groups;
        for (s=0; s < jBaptGroup.length; s++) {
            tStr += jBaptGroup[s].time_from + ' - ' + jBaptGroup[s].time_to +
                ' - ' + jBaptGroup[s].info + br;
        }
        tPBaptistry.innerHTML =  "<strong>Baptistry Schedule</strong> <em>Church Groups</em>" + br + tStr;
        tDivDetail.appendChild(tPBaptistry);

        //Family Priority Time
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
        let tPEndowment = document.createElement('p');
        tStr = '';
        let jEnd = temples[idx].ordinance_schedule.endowment;
        for (s=0; s < jEnd.length; s++) {
            tStr += jEnd[s].start_time + ' - ' + jEnd[s].info + br;
        }
        tPEndowment.innerHTML =  "<strong>Endowment Schedule</strong>" + br + tStr;
        tDivDetail.appendChild(tPEndowment);

        //Ordinance: Sealing
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
                    tStr += ' &#8212; <a href="'+ jMile[s].url +'" target="_blank">'+ jMile[s].url_title +'</a>';
                } else tStr += ' &#8212; ' + jMile[s].url_title;
            }
                
            tStr += br;

        }
        tPMileStones.innerHTML = tStr;
        tDivDetail.appendChild(tPMileStones);
    }

    //Add Learn More Button if Summary
    if (summaryOnly) {
        let tALearnMore = document.createElement('a');
        tALearnMore.setAttribute("class", "button");
        tALearnMore.href = "temples.html?tid=" + idx;
        tALearnMore.innerHTML = 'MORE ABOUT TEMPLE <i class="arrow right"></i>';
        tDivSummary.appendChild(tALearnMore);
    }

// ******** ADD DIV SECTIONS TO CONTAINER ************************

    // ******** CREATE "SUMMARY" DIV ************************
    if (summaryOnly) {
        var tDIVFlex = document.createElement('div');
    }

    objContainer = (summaryOnly) ? tDIVFlex : templeInfoContainer;
    objContainer.appendChild(tDivTitle);
    if (!summaryOnly) { templeInfoContainer.appendChild(tDivInfo); }
    objContainer.appendChild(tDivPic);
    objContainer.appendChild(tDivSummary);
    if (!summaryOnly) { templeInfoContainer.appendChild(tDivDetail); }

    if (summaryOnly) {
        templeInfoContainer.appendChild(tDIVFlex);
    }
}

function getTempleCityWeather(cityID, parentObjElement, objElement) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4){
            let weatherData = JSON.parse(xhr.responseText);

            let tStr = weatherData.main.temp.toFixed(0) + "\u00B0 F - " +
                weatherData.weather[0].description;
            objElement.innerHTML =  "<strong>Current Weather</strong>" + br + tStr;
            parentObjElement.appendChild(objElement);
        }
    };
    xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&units=imperial&APPID=66f6d6a1e23693c441db2a9ca11bd964');
    xhr.send();
}