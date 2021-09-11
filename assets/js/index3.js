// HTML handles
var searchBtn = document.querySelector(".searchBtn");
var select = document.getElementById("mileage");
var resultsDisplay = document.querySelector(".results");

// API handles
var googleAPIKey = "AIzaSyCtojOrOmevqFcBO6zPY4W3rdfluhyMWpk";
var searchRadius = 0;
var map;
var service;
var infowindow;
var filterArr = [];


//list of franchises to remove from search
var franchiseFilter = ["Starbucks", "Costa Coffee", "Tim Hortons", "Dunkin Donuts", "Dunkin", "Peet's Coffee", "Tully's", "McDonald's", "McCafe", "Tealicious Cafe", "Shipley Do-Nuts", "Panera Bread", "Barnes & Noble"];

//user clicks SEARCH, search parameters saved to variables
searchBtn.addEventListener("click", function(event){
    event.preventDefault();

    //read distance dropdown box and convert to meters
    var miles = select.value;
    searchRadius = getMeters(miles);

    //initMap should be last on the event listener after data is plugged into variables
    initMap();
});


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
            //rLink.href = 'https://www.google.com/maps?saddr=My+Location&daddr=' + filterArr[i].geometry.location.lat() + '%2C' + filterArr[i].geometry.location.lng();

            // append results to list
            rList.appendChild(rVicinity);
            rList.appendChild(rDirections);

            // show elements on results div
            resultsDisplay.appendChild(rName);
            resultsDisplay.appendChild(rList);
        }


        // offer the remaining results with VIEW ALL link
        
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

// Local store data to confirm RETURNING USER from now on
    // if user is FIRST TIME USER
        // display modal explaining purpose
        // mark user as RETURNING USER once modal is closed

    // else user is RETURNING USER
        // modal will not display for RETURNING USER

// user sees a button/link to go to favorite list
            
// back button to return to results