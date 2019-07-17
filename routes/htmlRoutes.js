/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        db.SexAssualtCrime.findAll({}).then(function(dbSexAssault) {
            res.sendFile("../public/index.html");
        });
    });

    // Load example page and pass in an example by id
    app.get("/sexualAssault/:id", function(req, res) {
        db.SexAssualtCrime.findOne({ where: { id: req.params.id } }).then(function(dbSexAssault) {
            res.render("example", {
                example: dbSexAssault
            });
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};