const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Donators = require('..//..//models/donator');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    console.log(req.body.password)
    bycrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const donator = new Donators({
                account_id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                donator_name: req.body.name,
                location: req.body.location,
                age: req.body.age
            });
            donator.save().then(result => {
                console.log(result);
                res.status(200).json({
                    sucess: "New donator has been created"
                });
            }).catch(error => {
                res.status(500).json({
                    error: err
                });

            });
        }
    })
})


router.post('/login', (req, res) => {
    //this route will handle user login
    Donators.findOne({
            email: req.body.email
        })
        .exec()
        //models name is donator not donators
        .then(donator => {

            bycrypt.compare(req.body.password, donator.password, (err, result) => {

                if (err) {
                    return res.status(401).json({
                        failed: "Unauthorized Access"
                    });
                }
                if (result) {
                    const JWTToken = jwt.sign({
                            email: donator.email,
                            _id: donator._id
                        },

                        'secrect', {
                            expiresIn: '2h'
                        });
                    return res.status(200).json({
                        sucess: 'user assigned jwt auth',
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

router.get('/donatorProfile/:name', (req, res) => {
    //This route will query the database and return user profile info

    Donators.find({
        donators_name: req.params.donators_name
    }, (err, Donators) => {
        if (err) {
            res.json({
                error: err
            })
        } else {
            res.json(Donators)
        }
    })
})
module.exports = router;