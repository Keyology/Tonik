//DEPENDECIES
// const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const artist = require('./app/routes/secure-routes/artist')
const donators = require('./app/routes/secure-routes/donators')
const mongoose = require('mongoose');
const fileUpload = require('./app/routes/secure-routes/fileupload')
const audioStream = require('./app/routes/secure-routes/stream')
const home = require('./app/routes/secure-routes/home');
//Port
const port = process.env.PORT || 5000;

//create a cors middleware
// app.use(function (req, res, next) {

//     /**
//      * set headers to allow cross origin request.
//      * This can also be used to whitelist certain websites 
//      * to allow them access to the server.
//      */
//     // heroku canot run start script for some reason
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });



//CONFIG FILES
const db = require('./config/db');


//PARSE APP/JSON
app.use(bodyParser.json());

//Parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: ''
}));

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

//Simulate DELETE/PUT
app.use(methodOverride(''));

// setting routes for the app.
artist(app);
donators(app);
fileUpload(app);
home(app);



// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));




//START APP
app.listen(port, () => console.log(`listening on port ${port}`))

module.exports = app