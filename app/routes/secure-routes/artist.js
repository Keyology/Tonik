const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Artist = require('..//..//models/artist');
const bycrypt = require('bcrypt');


router.post('/artistsignup', (req, res) => {
    //This route will handle how artist are signed up


    bycrypt.hash(req.body.password, 10, (err, hash) => {
        //encrypt password before it's stored into database
        if (err) {
            //if there is an error return 500 server error
            return res.status(500).json({
                error: err

            });

        } else {
            const artist = new Artist({
                account_id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                artist_name: req.body.name,
                description: req.body.description,
                location: req.body.location,
                age: req.body.age



            });
            artist.save().then(result => {
                console.log(result);
                res.status(200).json({
                    success: 'New user has been created'
                });

            }).catch(error => {
                res.status(500).json({
                    error: err
                });
            });
        }
    });


});

module.exports = router;