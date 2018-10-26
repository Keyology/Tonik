//DEPENDECIES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
//const routes = require('./app/routes');

//PORT
const port = process.env.PORT || 3000;

//CONFIG FILES
var db = require('./config/db');

//DATABASE
//config credentials
mongoose.connect(db.url, {
    useNewUrlParser: true,
    useCreateIndex: true
});

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

//use routes directory for finding routes
//app.use('/', routes);



// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

//ROUTES
require('./app/routes/artists');
require('./app/routes/comments');
require('./app/routes/donators');
require('./app/routes/songs');

//Models

require('./app/models/artist');
require('./app/models/donator');
require('./app/models/song');
require('./app/models/comment.js');



//START APP
app.listen(port, () => console.log(`listening on port ${port}`))

module.exports = app