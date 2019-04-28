const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Root Route
router.get('/', (req, res) => {
    res.redirect('/posts');
  });

// Register Form
router.get('/register', (req, res) => {
  res.render('register');
});

// Register Logic
router.post('/register', (req, res) => {
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (error, user) => {
    if (error) {
      console.log(error);
      res.render('/register');
      return;
    }
    passport.authenticate('local') (req, res, () => {
      res.redirect('/posts');
    });
  });
});

// Login Form
router.get('/login', (req, res) => {
  res.render('login');
});

// Login Logic
router.post('/login', passport.authenticate('local', {
  successRedirect: '/posts',
  failureRedirect: '/login'
  }), (req, res) => {
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;