const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
//const upload = require('..//..//aws-login')


router.get('/audio', (req, res) => {
    //this route will stream audio 

    aws.s3(s3Bucket).getFile(s3Path, (err, result) => {
        if (err) {
            return next(err);
        }
        const proc = new ffmpeg(result)
            .withAudioCodec('libmp3lame')
            .format('mp3')
            .on('error', function (err, stdout, stderr) {
                console.log('an error happened: ' + err.message);
                console.log('ffmpeg stdout: ' + stdout);
                console.log('ffmpeg stderr: ' + stderr);
            })
            .on('end', function () {
                console.log('Processing finished !');
            })
            .on('progress', function (progress) {
                console.log('Processing: ' + progress.percent + '% done');
            })
            .pipe(res, {
                end: true
            });
    });
});