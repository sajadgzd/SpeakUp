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

<<<<<<< HEAD
    // code for time slider in Find form
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 1440,
        step: 15,
        values: [540, 1020],
        slide: function(e, ui) {
            var hours1 = Math.floor(ui.values[0] / 60);
            var minutes1 = ui.values[0] - (hours1 * 60);

            if (hours1.length == 1) hours1 = '0' + hours1;
            if (minutes1.length == 1) minutes1 = '0' + minutes1;
            if (minutes1 == 0) minutes1 = '00';
            if (hours1 >= 12) {
                if (hours1 == 12) {
                    hours1 = hours1;
                    minutes1 = minutes1 + " PM";
                } else {
                    hours1 = hours1 - 12;
                    minutes1 = minutes1 + " PM";
                }
            } else {
                hours1 = hours1;
                minutes1 = minutes1 + " AM";
            }
            if (hours1 == 0) {
                hours1 = 12;
                minutes1 = minutes1;
            }



            $('.slider-time').html(hours1 + ':' + minutes1);

            var hours2 = Math.floor(ui.values[1] / 60);
            var minutes2 = ui.values[1] - (hours2 * 60);

            if (hours2.length == 1) hours2 = '0' + hours2;
            if (minutes2.length == 1) minutes2 = '0' + minutes2;
            if (minutes2 == 0) minutes2 = '00';
            if (hours2 >= 12) {
                if (hours2 == 12) {
                    hours2 = hours2;
                    minutes2 = minutes2 + " PM";
                } else if (hours2 == 24) {
                    hours2 = 11;
                    minutes2 = "59 PM";
                } else {
                    hours2 = hours2 - 12;
                    minutes2 = minutes2 + " PM";
                }
            } else {
                hours2 = hours2;
                minutes2 = minutes2 + " AM";
            }

            $('.slider-time2').html(hours2 + ':' + minutes2);
        }
    });

=======
>>>>>>> 6cfc3718c9eee616a1b4432d7918c3a3cb515545
    // Helper Function to empty out the forms if necessary later on
    function clear() {
        $("#").empty();
        $("#").empty();
    }


    function updateMap(response) {
        // update the markers on the map using the response Json
    }


    // CLICK HANDLERS
    // ==========================================================
    // .on("click") function associated with the Search Button
    $(document).on("click", "#findButton", function(event) {
        event.preventDefault();

        var location = $("#location").val();
        // form validation
        // if (location == "") {
        // $(".invalid").css("display", "block");
        //     console.log("LOCATION INPUT IS EMPTY");
        //     return false;
        // } else {
        //     location = location.replace(/\W+/g, " ");
        // }

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