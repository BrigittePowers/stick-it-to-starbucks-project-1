var serpAPIKey = "7fb7aa7e212bc49493c8e5edc8b5a97fe3ae2b0ddb576e59360860067a0a4455";
var serpAPIUrl = "https://serpapi.com/search.json?engine=google&q=Coffee&api_key=";

var googleAPIKey = "AIzaSyCtojOrOmevqFcBO6zPY4W3rdfluhyMWpk";

var mapsStaticAPI = "https://maps.googleapis.com/maps/api/staticmap?"; // + parameters

// user loads the page

var searchBtn = document.querySelector(".searchBtn");

searchBtn.addEventListener("click", function(event){
    event.preventDefault();

    getLocation();
});

function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitutde;
    var latLonValue = position.coords.latitude + "," + position.coords.longitude;
    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latLonValue + "&amp;zoom=14&amp;size=400x300&amp;key="+googleAPIKey;
    document.querySelector(".mapframe").innerHTML = "<img src='" + img_url + "'>";
}

function errorHandler(err) {
    if(err.code == 1) {
        alert("Erorr: Access is denied");
    } else if (err.code == 2) {
        alert("Error: Position is unavailable");
    }
}

function getLocation() {
    if (navigator.geolocation) {
        // timeout at 60000 millisecond (60 seconds)
        var options = {timeout: 60000};
        navigator.geolocation.getCurrentPosition (showLocation, errorHandler, options);
    } else {
    alert("Browser does not support geoelocation, sorry!");
    }
}

// hide DOM element
function hideElement(el) {
    el.style.display = 'none';
}
// show DOM element that was hidden
function showElement(el) {
    el.style.display = 'block';
}

async function serpAPI() {
    var queryUrl = serpAPIUrl + serpAPIKey;

    var response = await fetch(queryUrl);
    var data = await response.json();

    console.log(data);
}


// banner header at top of page is STATIC and remains visible throughout site navigation

// Local store data to confirm RETURNING USER from now on
    // if user is FIRST TIME USER
        // display modal explaining purpose
        // mark user as RETURNING USER once modal is closed

    // else user is RETURNING USER
        // modal will not display for RETURNING USER

// user sees a button/link to go to favorite list

// dynamic display landing page
    // form
        // text input zip code
        // dropdown distance options
        // submit button performs SEARCH
            // check that zip code was input
                // if zip code is input, record input + distance selection
                // if zip code is undefined, highlight input red and inform user REQUIRED
            // inputs are locally stored for RETURNING USER
    // form answers pull from local storage if RETURNING USER to show last search options selected
    // form answers default to placeholder-zip (Zip code needed...) and middle distance dropdown option 

// Once SEARCH is performed
    // remove dynamic landing page elements
    // create dynamic search page elements
        // show map showing pins for top 3 search results (closest by distance)
        // show list of 3 results
            

// when user clicks result
    // clicking an icon (fontawesome? star) allows the user to save the result to a favorites list (user feedback: icon changes color)
    // user will be shown embedded map direction information 
    // link to that coffee shop's data
        // name
        // website or menu link
        // address
        // hours
        // price (?)

// back button to return to results

// below the 3 viewable results will be a link to the google search on google.com to view full results

//TODO geolocate the user with Google API
//TODO Input user search in SERP API

