const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.get('/', (res, req) => {
    // This route will handle serving the landing page
})

router.get('/signup', (req, res) => {
    /*this route will handle sending user to the page that will ask them what type of user they are */
})


router.get('/login', (req, res) => {
    //This route will take the user to the login in page

})

module.exports = router;