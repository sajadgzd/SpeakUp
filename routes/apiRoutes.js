var db = require("../models");
// var moment = require("moment");
// console.log(moment());

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
            db.SexAssualtCrime.findAll({
                where: {
                    type: req.params.findCategory,
                    borough: req.params.findLocation,
                    date: {
                        $gte: req.params.startDate + "T" + req.params.findStartTime + "Z",
                        $lte: req.params.endDate + "T" + req.params.findEndTime + "Z"
                    }
                }
            }).then(function(dbSexAssault) {
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

        db.SexAssualtCrime.create(req.body).then(function(dbSexAssault) {
            res.json(dbSexAssault);
        });
    });
};