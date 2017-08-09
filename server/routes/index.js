var express = require('express');
var router = express.Router();
var authencontroller1 = require('../controller/authenlogin.js');
var moviecontroller = require('../controller/moviecontroller.js');
var mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*------function for my app--------*/
    router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});
  
router.post('/signup',authencontroller1.signup);

router.post('/login',passport.authenticate('local', {
       failureFlash: 'Invalid Username and Password',
       successFlash: "Welcome to Movie App"
    }),authencontroller1.login);

router.get('/movie/search:index', moviecontroller.search);

router.post('/movie/add', moviecontroller.add);

router.get('/movie/view', moviecontroller.view);

router.get('/movie/viewdetails',moviecontroller.viewdetails);

router.get('/movie/delete', moviecontroller.delete);

router.get('/logout',authencontroller1.logout)

module.exports=router;

