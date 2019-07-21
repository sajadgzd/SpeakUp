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
function getMostRecentCrime() {
    // first clear out the div
    $("#crimeDisplay").empty();

    //AJAX call to route that grabs the most recent crime
    $.ajax({
        url: "/api/mostRecentCrime",
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
    getMostRecentCrime();

    if (window.location.pathname === '/loggedInHome') {
        $("#signUpButton").hide();

    }

    function updateMap(response) {
        console.log(response);
        var map;
        var geocoder;
        var markerPopulate;
        var boroughChoice;


        var findLocation = $("#findLocation").val();
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        var findStartTime = $("#findStartTime").val();
        var findEndTime = $("#findEndTime").val();
        var findCategory = $("#findCategory").val();

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
        $.ajax({
            url: "/api/" + findCategory + "/" + findLocation + "/" + startDate +
                "/" + endDate + "/" + findStartTime + "/" + findEndTime,
            method: "GET",
        }).then(function(response) {

            console.log(response);
            var icon = {
                url: "../images/mapIcons/noun_Hand_164670.png",
                size: new google.maps.Size(30, 45),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(10, 15),
                scaledSize: new google.maps.Size(25, 25)
            }


            for (var i = 0; i < response.length; i++) {


                console.log(response[i].description)

                console.log(response[i])
                var marker = new google.maps.Marker({
                    position: { lat: response[i].lat, lng: response[i].lng },
                    map: map,
                    title: `${response[i].description}`,
                    icon: icon
                });
                if (!response[i].description) {
                    response[i].description = "No description provided by the reporter";
                }
                if (response[i].reported) {
                    response[i].reported = "Yes"
                } else {
                    response[i].reported = "No"
                }
                var content = "<div class='descriptions' style='font-size:15px;'>" + "<p> <span style='font-weight: bold;'> Type: </span>" + response[i].type +
                    "</p> <p> <span style='font-weight: bold;'> Description of evident: </span>" + response[i].description +
                    "</p> <p> <span style='font-weight: bold;'> Location: </span>" + response[i].location + "</p>" +
                    "</p> <p> <span style='font-weight: bold;'> Reported to the Police? </span>" + response[i].reported + "</p>" +
                    "</div>"


                var infowindow = new google.maps.InfoWindow()

                google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
                    return function() {
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    };
                })(marker, content, infowindow));



            }


        });


    }

    function updateAPIandMostRecentCrime(response) {
        // add markers to the map for the new crime reported

        console.log(response);
        location.reload();

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


        // Make the AJAX request to the API - GETs the JSON data from the route.
        // The data then gets passed as an argument
        $.ajax({
            url: "/api/" + findCategory + "/" + findLocation + "/" + startDate +
                "/" + endDate + "/" + findStartTime + "/" + findEndTime,
            method: "GET",

        }).then(updateMap);




    });

    // form validation message is hidden
    $(".invalid").css("display", "none");

    $(document.body).on("click", "#reportButton", function(event) {

        event.preventDefault();

        var reportCategory = $("#reportCategory").val();
        var reportLocation = $("#pac-input").val();
        var reportBorough = $("#reportLocation").val();
        var reportDate = $("#reportDate").val();
        var reportTime = $("#reportTime").val();
        var reportDescription = $("#reportDescription").val();
        var isReported = $("#isReported").is(":checked");

        //  form validation
        if (reportLocation == "") {
            $(".invalid").css("display", "block");
            return false;
        } else if (reportLocation !== "") {
            $(".invalid").css("display", "none");
        }

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

        $.post("/api/new/Crime", newCrime, updateAPIandMostRecentCrime);


        $("#pac-input").val("");

        // update the most recent crimes display after user submits a new one
        getMostRecentCrime();

    });


    $(document.body).on("click", "#findAllButton", function(event) {
        event.preventDefault();
        var findCategory = $("#findCategory").val();

        $.ajax({
            url: "/api/" + findCategory,
            method: "GET",

        }).then(function(response) {
            console.log(response);
        });




    });





});