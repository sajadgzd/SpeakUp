/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

// code to retrieve the location of the user. PUT ALL YOUR CODES UNDER LINE 67
var latitude;
var longitude;


function ipLookUp() {
    $.ajax('http://ip-api.com/json')
        .then(
            function success(response) {
                console.log(response);
                console.log('Latitude ', response.lat);
                latitude = response.lat;
                console.log('Longitude ', response.lon);
                longitude = response.lon;
            },

            function fail(data, status) {
                console.log('Request failed.  Returned status of',
                    status);
            }
        );
}
// ipLookUp();
if ("geolocation" in navigator) {
    // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition(
        function success(position) {
            // for when getting location is a success
            console.log('Geo latitude', position.coords.latitude,
                'Geo longitude', position.coords.longitude);
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

        },
        function error(error_message) {
            // for when getting location results in an error
            console.error('An error has occured while retrieving' +
                'location', error_message)
            ipLookUp()
        });
} else {
    // geolocation is not supported
    // get your location some other way
    console.log('geolocation is not enabled on this browser')
    ipLookUp()
}


// global function that will be used to post the most recent crimes whenever the page loads
// or a user adds a crime
function getMostRecentSecualAssault() {
    // first clear out the div
    $("#crimeDisplay").empty();

    //AJAX call to route that grabs the most recent crime
    $.ajax({
        url: "/api/mostRecentSexualAssault",
        method: "GET"
    }).then(function(response) {
        for (let i = 0; i < response.length; i++) {
            $("#crimeDisplay").append("<span style='font-weight: bold'> Type: </span> <span>" + response[i].type + "</span><br>");
            $("#crimeDisplay").append("<span style='font-weight: bold'> Borough: </span> <span>" + response[i].borough + "</span><br>");
            $("#crimeDisplay").append("<span style='font-weight: bold'> Location: </span> <span>" + response[i].location + "</span><br>");
            var convertedMostRecentDate = moment(response[i].createdAt).format("YYYY/MM/DD hh:mm A");
            // convertedMostRecentDate = parseInt(convertedDate);
            $("#crimeDisplay").append("<span style='font-weight: bold'> Reported Date: </span> <span>" + convertedMostRecentDate + "</span><br><hr><br>");
        };
        console.log(response);
        // getMostRecentHateCrime();
    });
};

function getMostRecentHateCrime() {
    // first clear out the div
    // $("#crimeDisplay").empty();

    //AJAX call to route that grabs the most recent crime
    $.ajax({
        url: "/api/mostRecentHateCrime",
        method: "GET"
    }).then(function(response) {
        for (let i = 0; i < response.length; i++) {
            $("#crimeDisplay").append("<span style='font-weight: bold'> Type: </span> <span>" + response[i].type + "</span><br>");
            $("#crimeDisplay").append("<span style='font-weight: bold'> Borough: </span> <span>" + response[i].borough + "</span><br>");
            $("#crimeDisplay").append("<span style='font-weight: bold'> Location: </span> <span>" + response[i].location + "</span><br>");
            var convertedMostRecentDate = moment(response[i].createdAt).format("YYYY/MM/DD hh:mm A");
            // convertedMostRecentDate = parseInt(convertedDate);
            $("#crimeDisplay").append("<span style='font-weight: bold'> Reported Date: </span> <span>" + convertedMostRecentDate + "</span><br><hr><br>");
        };
        console.log(response);
    });
};

// ALL CODES GOES INSIDE OF THIS .ready() FUNCTION::::::::::
$(document).ready(function() {

    // calling global function to get most recent crimes when page loads
    getMostRecentSecualAssault();
    getMostRecentHateCrime();




    // Helper Function to empty out the forms if necessary later on
    // function clear() {
    //     $("#").empty();
    //     $("#").empty();
    // }


    function updateMap(response) {
        console.log(response);
        var map;
        var geocoder;
        var markerPopulate;
        var boroughChoice;

        // update the the map so it shows up the markers on the selected borough
        for (let i = 0; i < response.length; i++) {
            markerPopulate = response[i].location;
            boroughChoice = response[i].borough
            console.log("TESTTTTT LOCATION", response[i].location);

            function initMap() {
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 8,
                    center: {
                        lat: 40.730610,
                        lng: -73.935242
                    }
                });
                geocoder = new google.maps.Geocoder();


            }

            geocodeAddress(map)

            function geocodeAddress(resultsMap = map) {
                console.log("HELLO")
                console.log(markerPopulate)
                geocoder.geocode({
                    'address': markerPopulate
                }, function(results, status) {
                    console.log(results)
                    if (status === 'OK') {

                        resultsMap.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: resultsMap,
                            position: results[0].geometry.location
                        });
                    }
                });

            }
        }


    }

    function addMarkerToMap(response) {
        // add markers to the map for the new crime reported
        console.log(response);
        // location.reload();

    }


    // CLICK HANDLERS
    // ==========================================================
    // .on("click") function associated with the Search Button
    $(document).on("click", "#findButton", function(event) {
        event.preventDefault();

        var findLocation = $("#findLocation").val();
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        var findStartTime = $("#findStartTime").val();
        var findEndTime = $("#findEndTime").val();
        var findCategory = $("#findCategory").val();
        // console.log("value of findLocation::::::", findLocation);
        // console.log("value of startDate::::::", startDate);
        // console.log("value of endDate::::::", endDate);
        // console.log("value of findStartTime::::::", findStartTime);
        // console.log("value of findEndTime::::::", findEndTime);
        // console.log("value of findCategory::::::", findCategory);


        // Make the AJAX request to the API - GETs the JSON data from the route.
        // The data then gets passed as an argument
        $.ajax({
            url: "/api/" + findCategory + "/" + findLocation + "/" + startDate +
                "/" + endDate + "/" + findStartTime + "/" + findEndTime,
            method: "GET",

        }).then(updateMap);
        // console.log(startDate);
        // console.log(endDate);
        // console.log(findStartTime)
        // console.log(findEndTime)

        // $.ajax({
        //     url: "/api/borough",
        //     method: "GET",

        // }).then(function(dbSexAssault) {
        //     console.log(dbSexAssault)
        // });


        if (findLocation === "Brooklyn") {
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 40.6392847,
                    lng: -73.9772993
                },
                zoom: 12,
                mapTypeId: 'roadmap'
            });
        } else if (findLocation === "Bronx") {
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 40.8475416,
                    lng: -73.8981581
                },
                zoom: 12.2,
                mapTypeId: 'roadmap'
            });

        } else if (findLocation === "Manhattan") {
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 40.758896,
                    lng: -73.985130
                },
                zoom: 12,
                mapTypeId: 'roadmap'
            });

        } else if (findLocation === "Queens") {
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 40.7315989,
                    lng: -73.8794842
                },
                zoom: 12,
                mapTypeId: 'roadmap'
            });

        } else if (findLocation === "StatenIsland") {
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 40.579021,
                    lng: -74.151535
                },
                zoom: 12,
                mapTypeId: 'roadmap'
            });

        }



    });


    $(document.body).on("click", "#reportButton", function(event) {
        event.preventDefault();

        // update the most recent crimes display after user submits a new one
        getMostRecentSecualAssault();

        var reportCategory = $("#reportCategory").val();
        var reportLocation = $("#pac-input").val();
        var reportBorough = $("#reportLocation").val();
        var reportDate = $("#reportDate").val();
        var reportTime = $("#reportTime").val();
        var reportDescription = $("#reportDescription").val();
        var isReported = $("#isReported").is(":checked");


        // console.log(reportBorough);
        // console.log(isReported);
        // console.log(reportDescription);
        // console.log(reportTime);
        // console.log(reportDate);
        // console.log(reportLocation);
        // console.log(reportCategory);
        var convertedDate = moment(reportDate + " " + reportTime).format("X");
        convertedDate = parseInt(convertedDate);
        console.log(convertedDate);

        var newCrime = {

                location: reportLocation,
                borough: reportBorough,
                date: convertedDate,
                type: reportCategory,
                description: reportDescription,
                reported: isReported
            }
            // Make the POST AJAX request to the API.

        $.post("/api/new/" + reportCategory, newCrime, addMarkerToMap);


        $("#pac-input").val("");

    });


    $(document.body).on("click", "#findAllButton", function(event) {

        var findCategory = $("#findCategory").val();

        $.ajax({
            url: "/api/" + findCategory,
            method: "GET",

        }).then(function(response) {
            console.log(response);
        });




    });





});