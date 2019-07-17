var db = require("../models");

module.exports = function(app) {
    // Get all examples
    app.get("/api/sexualAssault/:findLocation/:findCategory/:startDate/:endDate/:findStartTime/:findEndTime",
        function(req, res) {
            db.SexAssualtCrime.findAll({
                where: {
                    type: req.params.findCategory,
                    borough: req.params.findLocation,
                    from: {
                        $between: [req.params.startDate + " " + req.params.findStartTime, req.params.endDate + " " + req.params.findEndTime];
                    }
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

    // Delete an example by id
    // app.delete("/api/sexualAssault/:id", function(req, res) {
    //     db.SexAssualtCrime.destroy({ where: { id: req.params.id } }).then(function(dbSexAssault) {
    //         res.json(dbSexAssault);
    //     });
    // });
};