/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        db.Crime.findAll({}).then(function(dbCrime) {
            res.sendFile("../public/index.html");
        });
    });


    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};