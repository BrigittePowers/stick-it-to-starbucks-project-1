var serpAPIKey = "7fb7aa7e212bc49493c8e5edc8b5a97fe3ae2b0ddb576e59360860067a0a4455";
var serpAPIUrl = "https://serpapi.com/search.json?engine=google&q=Coffee&api_key=";

var googleAPIKey = "AIzaSyCtojOrOmevqFcBO6zPY4W3rdfluhyMWpk";

var mapsStaticAPI = "https://maps.googleapis.com/maps/api/staticmap?"; // + parameters

// user loads the page

var searchBtn = document.querySelector(".button");

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
        alert("Error: Access is denied");
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
