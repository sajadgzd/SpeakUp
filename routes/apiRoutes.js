var db = require("../models");
var moment = require("moment");
// console.log(moment());
var Sequelize = require("sequelize");
module.exports = function(app) {
    

    // get the most recent crime by using the createdAt attribute in the db
    // this route needs to be placed first, do not change order of the routes here
    // take the 
    app.get("/api/mostRecent", function(req, res) {
        db.SexAssualtCrime.findAll({
            limit: 3,
            order: [ ['createdAt', 'DESC']]
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
            db.SexAssualtCrime.findAll({
                where: {
                    type: req.params.findCategory,
                    borough: req.params.findLocation,

                    date: {
                        [Sequelize.Op.lte]: EndconvertedDate,
                        [Sequelize.Op.gte]: StartconvertedDate
                    }

                }
            }).then(function(dbSexAssault) {
                // console.log(obj);
                res.json(dbSexAssault);
            });
        });


    // Get all crimes of selected category
    app.get("/api/:findCategory",
        function(req, res) {
            db.SexAssualtCrime.findAll({
                where: {
                    type: req.params.findCategory
                }
            }).then(function(dbSexAssault) {
                res.json(dbSexAssault);
            });
        });

    // Create a new example
    app.post("/api/new/sexualAssault", function(req, res) {
        var object = {
            borough: req.body.borough,
            date: parseInt(req.body.date),
            location: req.body.location,
            reported: req.body.reported,
            type: req.body.type,
            description: req.body.description
        }
        db.SexAssualtCrime.create(object).then(function(dbSexAssault) {
            res.json(dbSexAssault);
        });
    });



};