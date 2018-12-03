// This file will handle files being uploaded
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const upload = require('..//..//aws-login')
const express = require('express');
const router = express.Router();
const Songs = require('../../models/song');
require('dotenv').config('../.env')






const singleUpload = upload.single('audio')

router.post('/audio-upload', (req, res) => {
    singleUpload(req, res, (err, some) => {
        if (err) {
            return res.json({
                err: [{
                    title: 'Audio file upload error',
                    detail: err.message
                }]
            });
        } else {
            const songs = new Songs({
                //might need to changr to email
                //artist_name: req.params.artist_name,
                song_title: req.body.song_title,
                song_link: req.file.location,

            });
            songs.save().then(() => {
                console.log('file saved to database and s3')
                return res.json({
                    'audioUrl': req.file.location,
                    "fileSaved": "file has been saved to db and s3"


                }).catch(error => {
                    console.log(error);
                    res.status(500).json({
                        error: err
                    });
                })
            })


        }
    })


})
module.exports = router;