/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {

    app.get('/registerPage', (req, res) => res.render('home', { user: req.user }));
    app.get('/loginPage', (req, res) => res.render('home', { user: req.user }));

    // app.get('/register', (req, res) => res.render('home', { user: req.user }));


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