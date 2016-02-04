// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var fs = require("fs");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var loginPath = 'assets/home.html';

// var port = process.env.PORT || 8080;        // set our port
var port = 7777;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// ***************************************************************
// Sample JSON Return
// ***************************************************************

router.get('/home', function(req, res) {
    console.log('/home');
    
    fs.readFile(loginPath, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
    }
    
    res.type('.html');
    res.send(data);    
    });
});

// ***************************************************************
// Catch-all route (accessed at GET http://localhost:8080/api/~)
// ***************************************************************

router.get('/*', function(req, res) {
    // TODO: see if we can print what we think the user requested
    res.json({"error":"I don't know how to handle this request"});   
});



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with what is listed below
app.use('', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port ' + port);

