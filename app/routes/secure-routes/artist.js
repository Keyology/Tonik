const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Artist = require('..//..//models/artist');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
            // models out how the user input will be stored into our database
            const artist = new Artist({
                account_id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                artist_name: req.body.name,
                description: req.body.description,
                location: req.body.location,
                age: req.body.age



            });
            //saves user input into database and check for errors
            artist.save().then(result => {
                console.log(result);
                res.status(200).json({
                    //sends us a json confirmation that a new user has been added to our database
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

router.post('/artistlogin', (req, res) => {
    // This route will handle when a user login
    Artist.findOne({
            email: req.body.email
        })
        .exec()
        .then(artist => {
            bycrypt.compare(req.body.password, artist.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        failed: 'Unauthorized Acess'
                    });
                }
                if (result) {
                    const JWTToken = jwt.sign({
                            email: artist.email,
                            _id: artist._id
                        },
                        'secrect', {
                            expiresIn: '2h'
                        });

                    return res.status(200).json({
                        success: " user assigned jwt auth",
                        token: JWTToken
                    });
                }


                return res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });



})




router.get('/artistprofile', (req, res) => {
    // This route will send a query to the mongodb and return the artist profile info in a json object
})

module.exports = router;