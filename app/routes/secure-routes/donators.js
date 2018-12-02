const mongoose = require('mongoose');
const Donator = require('../../models/donator');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



/**
 * Donator routes still a work in progress 
 * @author Carlos Alba
 */

module.exports = (app) => {

    /**
  * Signs up a new Donator
  */

    app.post('/signup', (req, res) => {
        // request body 
        let body = req.body
        bycrypt.hash(body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            // creating user document 
            Donator.create({
                account_id: new mongoose.Types.ObjectId(),
                email: body.email,
                password: hash,
                donator_name: body.name,
                location: body.location,
                age: body.age
            }, (err, donator) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                };
                return res.json({
                    message: `${donator} successfully created.`
                });
            });
        });

    });



    app.post('/login', (req, res) => {
        //this route will handle user login
        Donator.findOne({
            email: req.body.email
        })
            .exec()
            //models name is donator not Donator
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
                            'secret', {
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

    app.get('/donatorProfile/:name', (req, res) => {
        //This route will query the database and return user profile info

        Donator.find({
            Donator_name: req.params.Donator_name
        }, (err, Donator) => {
            if (err) {
                res.json({
                    error: err
                })
            } else {
                res.json(Donator);
            }
        });
    });

}