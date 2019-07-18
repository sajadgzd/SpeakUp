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

// ALL CODES GOES INSIDE OF THIS .ready() FUNCTION::::::::::
$(document).ready(function() {


    // Helper Function to empty out the forms if necessary later on
    function clear() {
        $("#").empty();
        $("#").empty();
    }


    function updateMap(response) {
        // update the the map so it shows up the markers on the selected borough
        for (let i = 0; i < response.length; i++) {
            var markerPopulate = response[i].location;
            var boroughChoice = response[i].borough
            console.log("TESTTTTT LOCATION", response[i].location);
            // var geocoder = new google.maps.Geocoder();

            // function geocodeAddress(geocoder, resultsMap) {
            //     var address = markerPopulate;
            //     geocoder.geocode({ 'address': address }, function(results, status) {
            //         if (status === 'OK') {
            //             resultsMap.setCenter(results[0].geometry.location);
            //             var marker = new google.maps.Marker({
            //                 map: resultsMap,
            //                 position: results[0].geometry.location
            //             });
            //             console.log(marker)
            //         } else {
            //             alert('Geocode was not successful for the following reason: ' + status);
            //         }

            //     });
            // }

            // geocodeAddress(geocoder);



        }


        console.log(response);

    }

    function addMarkerToMap(response) {
        // add markers to the map for the new crime reported
        console.log(response);

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
        console.log(startDate);
        console.log(endDate);
        console.log(findStartTime)
        console.log(findEndTime)

        $.ajax({
            url: "/api/borough",
            method: "GET",

        }).then(function(dbSexAssault) {
            console.log(dbSexAssault)
        });


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




        // $("#findLocation").val("");

    });


    $(document.body).on("click", "#reportButton", function(event) {
        event.preventDefault();
        var reportCategory = $("#reportCategory").val();
        var reportLocation = $("#pac-input").val();
        var reportBorough = $("#reportLocation").val();
        var reportDate = $("#reportDate").val();
        var reportTime = $("#reportTime").val();
        var reportDescription = $("#reportDescription").val();
        var isReported = $("#isReported").is(":checked");

        console.log(reportBorough);

        // console.log(isReported);
        // console.log(reportDescription);
        // console.log(reportTime);
        // console.log(reportDate);
        // console.log(reportLocation);
        // console.log(reportCategory);


        var newCrime = {
                location: reportLocation,
                borough: reportBorough,
                date: reportDate + "  " + reportTime,
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

        }).then(updateMap);




    });





});