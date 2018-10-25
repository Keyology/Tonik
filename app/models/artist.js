const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Created artist schema 
const ArtistSchema = new Schema({
    artistname: String,
    email: String,
    password: String,
    registration_date: {
        type: Date,
        default: Date.now
    },
    description: String,
    image: String

})

// module.exports = (app) => {

//     name: String,
//     location: String, 
//     signup_date: Date,
//     description: String,
//     image: String

// }