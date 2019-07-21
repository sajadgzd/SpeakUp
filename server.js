require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const customAuthMiddleware = require('./middleware/custom-auth-middleware');

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// use the cookie-parser to help with auth token,
// it must come before the customAuthMiddleware
app.use(cookieParser());
app.use(customAuthMiddleware);

// Handlebars
// set up handlebars
app.set('views', path.join(__dirname, '/views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    extname: '.handlebars',
    layoutsDir: 'views/layouts'
}));
app.set('view engine', 'handlebars');

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});

module.exports = app;