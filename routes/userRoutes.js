'use strict';
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let Question = mongoose.model('Question');
let User = mongoose.model('User');
let jwt = require('express-jwt');
let auth = jwt({
  userProperty: 'payload',
  secret: 'getajob'
});

router.post('/register', (req, res, next) => {
  if (!req.body.email || !req.body.password) return next('Include an email and password.');
  let user = new User();
  user.local.userName = req.body.userName;
  user.local.email = req.body.email;
  user.CreateHash(req.body.password, (err, hash) => {
    if (err) return next(err);
    user.local.password = hash;
    user.save((err, result) => {
      if (err) return next(err);
      if (!result) return next('Unable to create user.');
      res.send({ token: result.generateJWT() });
    });
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if(err) return next(err);
    res.send({ token: user.generateJWT() });
  })(req, res, next);
});

module.exports = router;
