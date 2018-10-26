const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songsSchema = new Schema({
    artist_name: String,
    song_title: String,
    song_link: String,
    song_length: Number,
    song_image: String,
    genre: String,
    date_released: {
        type: Date,
        default: Date.now
    }
})

const Songs = mongoose.model('Songs', songsSchema);
module.exports = Songs;