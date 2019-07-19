var db = require("../models");
var moment = require("moment");
var geocoder = require('google-geocoder');
// console.log(moment());
var Sequelize = require("sequelize");
module.exports = function(app) {


    // get the most recent crime by using the createdAt attribute in the db
    // this route needs to be placed first, do not change order of the routes here
    // take the 
    app.get("/api/mostRecentCrime", function(req, res) {
        db.Crime.findAll({
            limit: 3,
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(function(recent) {
            res.json(recent);
        });
    });


    // Get all examples
    app.get("/api/:findCategory/:findLocation/:startDate/:endDate/:findStartTime/:findEndTime",
        function(req, res) {

            var StartconvertedDate = moment(req.params.startDate + " " + req.params.findStartTime).format("X");
            StartconvertedDate = parseInt(StartconvertedDate);
            var EndconvertedDate = moment(req.params.endDate + " " + req.params.findEndTime).format("X");
            EndconvertedDate = parseInt(EndconvertedDate);
            var obj = {
                start: StartconvertedDate,
                end: EndconvertedDate
            }

            db.Crime.findAll({
                where: {
                    type: req.params.findCategory,
                    borough: req.params.findLocation,

                    date: {
                        [Sequelize.Op.lte]: EndconvertedDate,
                        [Sequelize.Op.gte]: StartconvertedDate
                    }

                }
            }).then(function(dbCrime) {
                // console.log(obj);
                res.json(dbCrime);
            });

        });


    // Get all crimes of selected category
    app.get("/api/:findCategory",
        function(req, res) {

            db.Crime.findAll({
                where: {
                    type: req.params.findCategory
                }
            }).then(function(dbCrime) {
                res.json(dbCrime);
            });

        });

    // Create a new CrimeCrime
    app.post("/api/new/Crime", function(req, res) {


        var geo = geocoder({
            key: 'AIzaSyAOghrohWNA37hFNGoey7gZSLHzicCD55U'
        });

        geo.find(req.body.location, function(err, response) {
            var object = {};

            console.log(response[0].location.lat)
            console.log(response[0].location.lng)

            object = {
                borough: req.body.borough,
                date: parseInt(req.body.date),
                location: req.body.location,
                lat: response[0].location.lat,
                lng: response[0].location.lng,
                reported: req.body.reported,
                type: req.body.type,
                description: req.body.description
            }

            db.Crime.create(object).then(function(dbCrime) {

                res.send(object);

            });


        });


    });



};