const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commnetSchema = new Schema({
    comment: String,
    creatd: Date,

})


const Comment = mongoose.model('comment', commnetSchema);
module.exports = Comment;