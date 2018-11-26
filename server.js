//DEPENDECIES
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// const home = require('./app/routes')
const artist = require('./app/routes/secure-routes/artist')
const donators = require('./app/routes/secure-routes/donators')
const mongoose = require('mongoose');
const fileUpload = require('./app/routes/secure-routes/fileupload')

//create a cors middleware
app.use(function(req, res, next) {
    //set headers to allow cross origin request.
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
});

//PORT
const port = process.env.PORT || 5000;

//CONFIG FILES
const db = require('./config/db');

//DATABASE
//config credentials
mongoose.connect(db.url, {
    useNewUrlParser: true,
    useCreateIndex: true
});

// app.get('/', (req, res) => {
//     res.send('in development')
// })
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

// tells express to check out routes directory for routes
// app.use('/', routes);
app.use('/artist', artist);
app.use('/donators', donators);
app.use('/fileUpload', fileUpload)

//use routes directory for finding routes
//app.use('/', routes);



// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

//CONTROLLERS
//require('./app/routes/artists.js');
//require('./app/routes/comments.js');
//require('./app/routes/donators.js');
//require('./app/routes/songs.js');

//MODELS
//require('./app/models/artist.js');
//require('./app/models/donator.js');
//require('./app/models/song.js');
//require('./app/models/comment.js');



//START APP
app.listen(port, () => console.log(`listening on port ${port}`))

module.exports = app