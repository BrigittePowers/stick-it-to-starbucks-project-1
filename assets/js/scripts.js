// HTML handles
var searchBtn = document.querySelector(".searchBtn");
var select = document.getElementById("mileage");

// API handles
var googleAPIKey = "AIzaSyCtojOrOmevqFcBO6zPY4W3rdfluhyMWpk";
var radius = 0;
var map;
var service;
var infowindow;


//list of franchises to remove from search
var corporateCoffee = ["Starbucks", "Costa Coffee", "Tim Hortons", "Dunkin Donuts", "Dunkin", "Peet's Coffee", "Tully's", "McDonald's", "McCafe", "Tealicious Cafe", "Shipley Do-Nuts", "Panera Bread"];

// Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=29.5632896%2C-98.6710016&radius=8046.72&type=cafe&key=AIzaSyCtojOrOmevqFcBO6zPY4W3rdfluhyMWpk. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).

// geolocation marker handles
var locations = [
    ['You are Here', 0, 0],
    ['Philz Coffee<br>\
    525 Santa Monica Blvd, Santa Monica, CA 90401<br>\
    <a href="https://goo.gl/maps/PY1abQhuW9C2">Get Directions</a>', 
    34.017951, 
    -118.493567],
    ['Result 2', 33.849182, -118.388405],
    ['Result 3', 33.628342, -117.927933],
];

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

async function findCafe(lat, lng) {
    /* var queryURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCtojOrOmevqFcBO6zPY4W3rdfluhyMWpk&libraries=places" + "?location=" + lat + "%2C" + lng + "&radius=" + radius + "&type=cafe&key=AIzaSyCtojOrOmevqFcBO6zPY4W3rdfluhyMWpk";

    var response = await fetch(queryURL);
    var data = await response.json();

    console.log(data);
    return data;
    */

    

}

function getMeters(i) {
    return i*1609.344;
}

//create the map using var LOCATIONS
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

                //locations[0][1] = pos.lat;
                //locations[0][2] = pos.lng;

                //var cafeData = findCafe();

                var request = {
                    query: "Longhorn Cafe",
                    fields: ["name", "geometry"],
                };
            
                service = new google.maps.places.PlacesService(map)

                service.findPlaceFromQuery(request, function(results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            createMarker(results[i], map);
                        }
                    }
                });
                

            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
        
        /*
        
        var marker, count;
        
        for (count = 0; count < locations.length; count++) {
            marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[count][1], locations[count][2]),
            map: map,
            title: locations[count][0]
            });
            
            google.maps.event.addListener(marker, 'click', (function (marker, count) {
                return function () {
                infowindow.setContent(locations[count][0]);
                infowindow.open(map, marker);
                }
            })(marker, count));
        }
        */

    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

// user loads the page

//user clicks SEARCH, search parameters saved to variables
searchBtn.addEventListener("click", function(event){
    event.preventDefault();

    //read distance dropdown box and convert to meters
    var miles = select.value;
    radius = getMeters(miles);

    //initMap should be last on the event listener after data is plugged into variables
    initMap();
});

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