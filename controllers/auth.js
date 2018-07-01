var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

router.post('/signup', function(req, res) {
    db.user.findOrCreate({
      where:{ email: req.body.email },
      defaults:{
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        user_name: req.body.userId,
        email: req.body.email,
        password: req.body.password
      }
    }).spread(function(user, created){
      if(created){
        console.log('Created new User');
        //created new user
        passport.authenticate('local', {
          successRedirect: '/',
          successFlash: 'Account Created and Logged in!'
        })(req, res);
      }else{
        //found record so they cannot use email
        console.log('User Already Exists');
        req.flash('error', 'Email already exists');
        res.redirect('/signup')
      }
    }).catch(function(error){
      console.log(error.message);
      req.flash('error', error.message)
      res.redirect('signup')
    });
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    successFlash: 'You have Logged In.',
    failureFlash: 'Incorrect login or password.'
  }));

  router.get('/logout', function(req, res){
    //passport logout() and clears session
    req.logout();
    req.flash('success', 'You have logged out!');
    res.redirect('/')
  });

module.exports = router;