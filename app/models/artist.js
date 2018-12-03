const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Created artist schema 
const artistSchema = new Schema({

    account_id: mongoose.Schema.Types.ObjectId,

    artist_name: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    registration_date: {
        type: Date,
        default: Date.now
    },
    description: String,

    location: String,

    //image: String,
    //could save image in a s3 bucket 

    age: {
        type: Number,
        required: true
    },
    songs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Songs'


        }

    ]



})

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;