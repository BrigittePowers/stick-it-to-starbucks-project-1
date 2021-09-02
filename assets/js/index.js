// user loads the page

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