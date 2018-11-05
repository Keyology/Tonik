const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Donators = require('..//..//models/donator');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/donatorsignup', (req, res) => {

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
                donators_name: req.body.name,
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


router.post('/donatorlogin', (req, res) => {
    //this route will handle user login
})

router.get('/donatorProfile', (req, res) => {
    //This route will query the database and return user profile info
})
module.exports = router;