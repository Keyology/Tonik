const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Artist = require('../../models/artist');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res) => {
    //This route will handle how artist are signed up

    bycrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const artist = new Artist({
                account_id: new mongoose.Types.ObjectId(),
                email: req.body.email ? req.body.email : null,
                password: hash,
                artist_name: req.body.artist_name,
                description: req.body.description,
                location: req.body.location,
                age: req.body.age
            });
            artist.save().then(result => {
                console.log(result);
                res.status(200).json({
                    sucess: "New artist has joined"
                });
            }).catch(error => {
                console.log(error);
                res.status(500).json({
                    error: err
                });

            });
        }
    })


})

router.post('/artistlogin', (req, res) => {
    // This route will handle when a user login
    Artist.findOne({
            //checks database to see if email is a match
            email: req.body.email
        })
        .exec()
        .then(artist => {
            //decrypts password in database and compares password user submit to find match 
            bycrypt.compare(req.body.password, artist.password, (err, result) => {
                if (err) {
                    //if the email or password dose't match throw error 
                    return res.status(401).json({
                        failed: 'Unauthorized Acess'
                    });
                }
                if (result) {
                    //if password and email exist in database create a jwt token
                    const JWTToken = jwt.sign({
                            email: artist.email,
                            _id: artist._id
                        },
                        'secrect', {
                            expiresIn: '2h'
                        });

                    //  return res.status(200).json({
                    //     //send jwt token to artist
                    //     //send jwt token to cookies 
                    //     success: " user assigned jwt auth",
                    //     token: JWTToken
                    // });
                    console.log("new account")
                    return res.cookie(JWTToken).status(200)
                }


                return res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            });
        }).catch(error => {
            //handles error on server side
            res.status(500).json({
                error: error
            });
        });



})




router.get('/artistprofile/:name', (req, res) => {
    // This route will send a query to the mongodb and return the artist profile info in a json object

    Artist.find({
        artist_name: req.params.name
        // description: req.param.description,
        // location: req.param.location,
        // age: req.param.age

    }, (err, Artist) => {
        if (err) {
            res.json({
                error: err
            })
        } else {
            res.json(Artist)
        }
    })


})


module.exports = router;