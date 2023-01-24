const { Router } = require('express');
const authController = require('../controllers/authController');

//used to handle routing in the application
const router = Router();

//GET route for the login page
router.get('/login', authController.login_get);
//POST route for the login page
router.post('/login', authController.login_post);
///GET route for the signup page
router.get('/signup', authController.signup_get);
///POST route for the signup page
router.post('/signup', authController.signup_post);

module.exports = router;