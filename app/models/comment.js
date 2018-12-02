const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * The comment model is associated with a 
 * foreign song model which is referenced with 
 * the songID field.
 * @author Carlos Alba 
 */

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    songID: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('comment', commentSchema);