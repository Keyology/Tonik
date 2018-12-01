const mongoose = require('mongoose');
const Artist = require('../../models/artist');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Artists Router
 */

module.exports = (app) => {

    app.post('/signup', (req, res) => {
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
                    const JWTToken = jwt.sign({
                        email: artist.email,
                        _id: artist._id
                    },
                        'secrect', {
                            expiresIn: '2h'
                        });
                    console.log(result);
                    return res.json(JWTToken).status(200);
                }).catch(error => {
                    console.log(error);
                    res.status(500).json({
                        error: err
                    });

                });
            }
        })


    })

    app.post('/login', (req, res) => {
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
                        return res.json(JWTToken).status(200)
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
    });




    app.get('/artistprofile/:email', (req, res) => {
        // This route will send a query to the mongodb and return the artist profile info in a json object
        Artist.findOne({
            email: req.params.email
        }, (err, Artist) => {
            if (err) {
                res.json({
                    error: err
                })
            } else {
                res.json(Artist)
            }
        })
    });



}