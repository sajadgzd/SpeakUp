var db = require("../models");
var moment = require("moment")
    // var moment = require("moment");
    // console.log(moment());

module.exports = function(app) {
    // Get all examples
    app.get("/api/:findCategory/:findLocation/:startDate/:endDate/:findStartTime/:findEndTime",
        function(req, res) {
            moment.unix(req.params.startDate)

            db.SexAssualtCrime.findAll({
                where: {
                    type: req.params.findCategory,
                    borough: req.params.findLocation,
                    date: {
                        $gte: 20180710,
                        $lte: 13421324
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