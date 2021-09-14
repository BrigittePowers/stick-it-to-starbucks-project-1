// HTML handles
var searchBtn = document.querySelector(".searchBtn");
var viewBtn = document.getElementById("viewAll");
var select = document.getElementById("mileage");
var resultsDisplay = document.querySelector(".results");
var resultsTitle = document.querySelector(".results-title");
var resultsWrap = document.getElementById("destination-section");

// local storage handles
const rememberDiv = document.querySelector('.remember');
const forgetDiv = document.querySelector('.forget');
const form = document.querySelector('form');
const nameInput = document.querySelector('#entername');
const submitBtn = document.querySelector('#submitname');
const forgetBtn = document.querySelector('#forgetname');

const h2 = document.querySelector('h2');
const personalGreeting = document.querySelector('.personal-greeting');

// API handles
var googleAPIKey = "AIzaSyCtojOrOmevqFcBO6zPY4W3rdfluhyMWpk";
var searchRadius = 0;
var map;
var service;
var infowindow;
var filterArr = [];


//list of franchises to remove from search
var franchiseFilter = ["Starbucks", "Costa Coffee", "Tim Hortons", "Dunkin Donuts", "Dunkin", "Dunkin", "Dunkin'", "Dunk'n Donuts", "Peet's Coffee", "Tully's", "McDonald's", "McCafe", "Tealicious Cafe", "Shipley Do-Nuts", "Panera Bread", "Barnes & Noble"];

//user clicks SEARCH, search parameters saved to variables
searchBtn.addEventListener("click", function(event){
    event.preventDefault();

    resultsDisplay.innerHTML = "";

    viewBtn.style.display = 'block';


    //read distance dropdown box and convert to meters
    var miles = select.value;
    searchRadius = getMeters(miles);

    //initMap should be last on the event listener after data is plugged into variables
    initMap();
});

viewBtn.addEventListener("click", function(event) {
    event.preventDefault();

    viewBtn.style.display = 'none';

    showFullResults();
});

function showFullResults() {
    //0 1 2 already displayed

    for (i= 3; i < filterArr.length; i++) {
        createMarker(filterArr[i], map);

        resultsTitle.innerHTML = "<h2 class='title'>Showing All Results</h2>";

        // create elements
        var rName = document.createElement('h4');
        var rList = document.createElement('ul');
        var rVicinity = document.createElement('li');
        var rDirections = document.createElement('li');

        // set element data
        rName.innerHTML = filterArr[i].name;
        rVicinity.innerHTML = filterArr[i].vicinity;
        rDirections.innerHTML = "<a href='" + 'https://www.google.com/maps?saddr=My+Location&daddr=' + filterArr[i].geometry.location.lat() + '%2C' + filterArr[i].geometry.location.lng() + "'>Get Directions</a>";

        // append results to list
        rList.appendChild(rVicinity);
        rList.appendChild(rDirections);

        // show elements on results div
        resultsDisplay.appendChild(rName);
        resultsDisplay.appendChild(rList);
    }
}

// == FUNCTIONS (a-z)==

// returns results data
function callback(results, status) {
    // places service status is working
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        // for the length of the results array
        for (var i = 0; i < results.length; i++) {
            // so long as data's name doesn't match our franchise filter
            if (franchiseFilter.indexOf(results[i].name) === -1) {
                // concat onto a new filtered array
                filterArr.push(results[i]);
            }
        }

        // display 3 closest results and marker
        for (var i = 0; i < 3; i++) {
            createMarker(filterArr[i], map);

            // create elements
            var rName = document.createElement('h4');
            var rList = document.createElement('ul');
            var rVicinity = document.createElement('li');
            var rDirections = document.createElement('li');

            // set element data
            rName.innerHTML = filterArr[i].name;
            rVicinity.innerHTML = filterArr[i].vicinity;
            rDirections.innerHTML = "<a href='" + 'https://www.google.com/maps?saddr=My+Location&daddr=' + filterArr[i].geometry.location.lat() + '%2C' + filterArr[i].geometry.location.lng() + "'>Get Directions</a>";
            
            // append results to list
            rList.appendChild(rVicinity);
            rList.appendChild(rDirections);

            // show elements on results div
            resultsDisplay.appendChild(rName);
            resultsDisplay.appendChild(rList);
        }
        
        //console log data
        console.log(results);

    } else // places service status not working
        console.log("API Server is currently unreachable");
}

// creates waypoints
function createMarker(place, map) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    });
}

// converts miles to meters
function getMeters(i) {
    return i*1609.344;
}

// create the map & results page
async function initMap() {

    

    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(document.querySelector('.mapframe'), {
        zoom: 10,
    });  

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {

                resultsWrap.style.display = "block";
                resultsTitle.innerHTML = "<h2 class='title'>Top 3 Results</h2>";

                const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                };
                map.setCenter(pos);
                
                var center = new google.maps.LatLng(pos.lat, pos.lng)

                var request = {
                    location: center,
                    radius: searchRadius,
                    type: ['cafe'],
                    keyword: "coffee",
                };

                service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, callback);

            },
            () => {
                handleLocationError(true, infowindow, map.getCenter());
            }
        );

    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infowindow, map.getCenter());
    }
}

// = LOCAL STORAGE =
// Stop the form from submitting when a button is pressed
form.addEventListener('submit', function(e) {
    e.preventDefault();
});

  // run function when the 'Say hello' button is clicked
submitBtn.addEventListener('click', function() {
    // store the entered name in web storage
    localStorage.setItem('name', nameInput.value);
    // run nameDisplayCheck() to sort out displaying the
    // personalized greetings and updating the form display
    nameDisplayCheck();
});

  // run function when the 'Forget' button is clicked
forgetBtn.addEventListener('click', function() {
    // Remove the stored name from web storage
    localStorage.removeItem('name');
    // run nameDisplayCheck() to sort out displaying the
    // generic greeting again and updating the form display
    nameDisplayCheck();
});

// define the nameDisplayCheck() function
function nameDisplayCheck() {
    // check whether the 'name' data item is stored in web Storage
    if(localStorage.getItem('name')) {
      // If it is, display personalized greeting
        let name = localStorage.getItem('name');
        h2.textContent = 'Hi, ' + name;
        personalGreeting.textContent = 'Let Us Find A Local Coffee Shop For You!';

      // hide the 'remember' part of the form and show the 'forget' part
        forgetDiv.style.display = 'block';
        rememberDiv.style.display = 'none';

    } else {
    // if not, display generic greeting
        h2.textContent = 'Hi there! ';
        personalGreeting.textContent = 'Let Us Find A Local Coffee Shop For You';
    
        // hide the 'forget' part of the form and show the 'remember' part
        forgetDiv.style.display = 'none';
        rememberDiv.style.display = 'block';
    }
}

document.body.onload = nameDisplayCheck;