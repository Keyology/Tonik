const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donatorSchema = new Schema({
    //account_id: mongoose.Types.ObjectId(),
    //need to create account id with object id
    donator_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registration_date: {
        type: Date,
        default: Date.now
    },

    description: String,
    image: String



})

const Donator = mongoose.model('Donator', donatorSchema);
module.exports = Donator;