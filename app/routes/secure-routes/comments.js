// This file will contain routes that allow user to crud comments and associate them to the song they belong to
const Comment = require('../../models/comment');

module.exports = (app) => {

    /**
     * Finds all comments associated with a song.
     */
    app.get('/song/comments/:songID', (req, res) => {

        Comment.find({ songID: req.params.songID }, (err, comments) => {
            if (err) {
                return res.json({ error: err });
            }
            return res.json(comments);
        })


    });

    /**
     * Creates a new comment
     */
    app.post('/song/comments/new', (req, res) => {

        Comment.create({
            content: req.body.content,
            songID: req.body.songID
        }, (err, comment) => {
            if (err) {
                return res.json({ error: err });
            }
            return res.json({ message: `${comment} was successfully created` });
        })

    })



    /**
     * Update comment by id
     */
    app.put('/song/comments/update', (req, res) => {
        // Comment.update({_id: req.body.commentID},{content: req.body.content}
        Comment.updateOne({ _id: req.body.commentID }, { content: req.body.content }, (err, comment) => {
            if (err) {
                return res.json({ error: err });
            }
            return res.json({ message: `${comment} was successfully updated` });
        })
    });


    /**
     * Delete comment by id
     */

    app.delete('/song/comments/delete', (req, res) => {

        Comment.deleteOne({ _id: req.body.commentID }, (err) => {
            if (err) {
                res.json({ error: err });
            }
        })

    })



}