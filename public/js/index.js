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
        // update the markers on the map using the response Json

        if (location === "Brooklyn") {
            console.log("BROOOOOKLYN")
        }
    }


    // CLICK HANDLERS
    // ==========================================================
    // .on("click") function associated with the Search Button
    $(document).on("click", ".viewButton", function(event) {
        event.preventDefault();

        var location = $("#location").val().trim();
        // form validation
        if (location == "") {
            // $(".invalid").css("display", "block");
            console.log("LOCATION INPUT IS EMPTY");
            return false;
        } else {
            location = location.replace(/\W+/g, " ");
        }

        var date = $("#date").val().trim();
        var time = $("#time").val().trim();
        var type = $("#type").val().trim();
        // console.log("value of x::::::", location);

        // form validation
        // if (location == "") {
        //     $(".invalid").css("display", "block");
        //     return false;
        // }
        // if (location !== "") {
        //     if (["/", "^", "\'", "*", "!"].includes(location)) {
        //         $(".invalid").css("display", "block");
        //         return false;
        //     } else {
        //         $(".invalid").css("display", "none");
        //     }
        // }


        // Make the AJAX request to the API - GETs the JSON data from the route.
        // The data then gets passed as an argument
        $.ajax({
            url: "/api/crime",
            method: "GET",

        }).then(updateMap);


        $("#location").val("");
    });


    $(document.body).on("click", ".reportButton", function(event) {
        event.preventDefault();


        var location = $("#report-location").val().trim();
        var date = $("#date").val().trim();
        var time = $("#time").val().trim();
        var type = $("#type").val().trim();
        var description = $("#description").val().trim();
        var isReported = $("#is-reported").val();


        var newCrime = {
                location: location,
                date: date,
                time: time,
                type: type,
                description: description,
                isReported: isReported
            }
            // Make the POST AJAX request to the API.
        $.post("/api/new/crime", newCrime, updateMap);


        $("#location").val("");
    });







});




















// //NOTE NOTE:::::
// //THIS IS THE BOILER PLATE CODE PROVIDED BY SEQUELIZE. PLEASE DONT TOUCH. ALL CODE NEEDS TO GO ABOVE THIS LINE.

// // DON'T Write any CODE BELOW THIS LINE

// // Get references to page elements
// // var $exampleText = $("#example-text");
// // var $exampleDescription = $("#example-description");
// // var $submitBtn = $("#submit");
// // var $exampleList = $("#example-list");

// // // The API object contains methods for each kind of request we'll make
// // var API = {
// //     saveExample: function(example) {
// //         return $.ajax({
// //             // eslint-disable-next-line prettier/prettier
// //             headers: {
// //                 "Content-Type": "application/json"
// //             },
// //             type: "POST",
// //             url: "api/examples",
// //             data: JSON.stringify(example)
// //         });
// //     },
// //     getExamples: function() {
// //         return $.ajax({
// //             url: "api/examples",
// //             type: "GET"
// //         });
// //     },
// //     deleteExample: function(id) {
// //         return $.ajax({
// //             url: "api/examples/" + id,
// //             type: "DELETE"
// //         });
// //     }
// // };

// // refreshExamples gets new examples from the db and repopulates the list
// // var refreshExamples = function() {
// //     API.getExamples().then(function(data) {
// //         var $examples = data.map(function(example) {
// //             var $a = $("<a>")
// //                 .text(example.text)
// //                 .attr("href", "/example/" + example.id);

// //             var $li = $("<li>")
// //                 .attr({
// //                     class: "list-group-item",
// //                     "data-id": example.id
// //                 })
// //                 .append($a);

// //             var $button = $("<button>")
// //                 .addClass("btn btn-danger float-right delete")
// //                 .text("ｘ");

// //             $li.append($button);

// //             return $li;
// //         });

// //         $exampleList.empty();
// //         $exampleList.append($examples);
// //     });
// // };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// // var handleFormSubmit = function(event) {
// //     event.preventDefault();

// //     var example = {
// //         text: $exampleText.val().trim(),
// //         description: $exampleDescription.val().trim()
// //     };

// //     if (!(example.text && example.description)) {
// //         alert("You must enter an example text and description!");
// //         return;
// //     }

// //     API.saveExample(example).then(function() {
// //         refreshExamples();
// //     });

// //     $exampleText.val("");
// //     $exampleDescription.val("");
// // };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// // var handleDeleteBtnClick = function() {
// //     var idToDelete = $(this)
// //         .parent()
// //         .attr("data-id");

// //     API.deleteExample(idToDelete).then(function() {
// //         refreshExamples();
// //     });
// // };

// // // Add event listeners to the submit and delete buttons
// // $submitBtn.on("click", handleFormSubmit);
// // $exampleList.on("click", ".delete", handleDeleteBtnClick);