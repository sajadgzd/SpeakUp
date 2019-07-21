var db = require("../models");
var moment = require("moment");
var geocoder = require('google-geocoder');
// console.log(moment());

const bcrypt = require('bcrypt');
const { User } = require('../models');

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


    // Get request for findButton
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
            if (req.params.findCategory === "All") {
                db.Crime.findAll({
                    where: {
                        borough: req.params.findLocation,
                        date: {
                            [Sequelize.Op.lte]: EndconvertedDate,
                            [Sequelize.Op.gte]: StartconvertedDate
                        }
                    }
                }).then(function(dbCrime) {
                    res.json(dbCrime);
                });
            } else {
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
            }
        });


    // Get all crimes of selected category
    app.get("/api/:findCategory",
        function(req, res) {
            if (req.params.findCategory === "All") {
                db.Crime.findAll({}).then(function(dbCrime) {
                    res.json(dbCrime);
                });
            } else {
                db.Crime.findAll({
                    where: {
                        type: req.params.findCategory
                    }
                }).then(function(dbCrime) {
                    res.json(dbCrime);
                });
            }
        });


    // Create a new Crime
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



    /* Register Route
    ========================================================= */
    app.post('/registerPage', async(req, res) => {

        // hash the password provided by the user with bcrypt so that
        // we are never storing plain text passwords. This is crucial
        // for keeping your db clean of sensitive data
        const hash = bcrypt.hashSync(req.body.password, 10);

        try {
            // create a new user with the password hash from bcrypt
            let user = await User.create(
                Object.assign(req.body, { password: hash })
            );

            // data will be an object with the user and it's authToken
            let data = await user.authorize();

            // send back the new user and auth token to the
            // client { user, authToken }
            return res.json(data);

        } catch (err) {
            return res.status(400).send(err);
        }

    });

    /* Login Route
    ========================================================= */
    app.post('/login', async(req, res) => {
        const { username, password } = req.body;

        // if the username / password is missing, we use status code 400
        // indicating a bad request was made and send back a message
        if (!username || !password) {
            return res.status(400).send(
                'Request missing username or password param'
            );
        }

        try {

            // we will cover the user authenticate method in the next section
            let user = await User.authenticate(username, password)

            return res.json(user);

        } catch (err) {
            return res.status(400).send('invalid username or password');
        }

    });

    /* Logout Route
    ========================================================= */
    app.delete('/logout', async(req, res) => {

        // because the logout request needs to be send with
        // authorization we should have access to the user
        // on the req object, so we will try to find it and
        // call the model method logout
        const { user, cookies: { auth_token: authToken } } = req

        // we only want to attempt a logout if the user is
        // present in the req object, meaning it already
        // passed the authentication middleware. There is no reason
        // the authToken should be missing at this point, check anyway
        if (user && authToken) {
            await req.user.logout(authToken);
            return res.status(204).send()
        }

        // if the user missing, the user is not logged in, hence we
        // use status code 400 indicating a bad request was made
        // and send back a message
        return res.status(400).send({ errors: [{ message: 'not authenticated' }] });
    });

    /* Me Route - get the currently logged in user
    ========================================================= */
    app.get('/me', (req, res) => {
        if (req.user) {
            return res.send(req.user);
        }
        res.status(404).send({ errors: [{ message: 'missing auth token' }] });
    });





};