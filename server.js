//DEPENDECIES
const express = requrire('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//CONFIG FILES
var db = require('./config/db');

//PORT
const port = process.env.PORT || 3000;

//DATABASE
//config credentials
mongoose.connect(db.url);

//PARSE APP/JSON
app.use(bodyParser.json());

//Parse application/vnd.api+json as json
app.use(bodyParser.json({ type: '' }));

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Simulate DELETE/PUT
app.use(methodOverride(''));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

//ROUTES
require('./app/artists')(app);
require('./app/comments')(app);
require('./app/donators')(app);
require('./app/songs')(app);

//START APP
app.listen(port);
console.log('Stuff is working on ' + port);

module.exports = app;
