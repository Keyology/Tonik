const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config('../.env')




aws.config.update({
    secrectAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_DEFAULT_REGION

});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'tonik-mvp',
        acl: 'public-read',
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(MP3|MP4|)$/)) {
                return cb(new Error('Only MP3 or MP4 files are allowed!'), false);
            }
            cb(null, true);

        },
        metadata: (req, file, cb) => {
            cb(null, {
                fieldName: file.fieldname
            });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString())
        }
    })
})




module.exports = upload;