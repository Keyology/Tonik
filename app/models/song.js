const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songsSchema = new Schema({
    artist_name: {
        type: String,
        required: true,
    },
    song_title: {
        type: String,
        required: true,
    },
    song_link: {
        type: String,
        required: true,
    },
    song_length: Number,
    song_image: String,
    genre: {
        type: String,
        required: true,

    },
    date_released: {
        type: Date,
        default: Date.now
    }
})

const Songs = mongoose.model('Songs', songsSchema);
module.exports = Songs;