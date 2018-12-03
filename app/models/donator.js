const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Donator model
 *  Edited by @author Carlos Alba
 */

const donatorSchema = new Schema({
    //account_id: mongoose.Types.ObjectId(),
    //need to create account id with object id
    account_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
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
    image: String,
    age: Number
})

module.exports = mongoose.model('Donator', donatorSchema);