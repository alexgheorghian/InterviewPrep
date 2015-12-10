'use strict';
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let User = mongoose.model('User');
// let Bird = mongoose.model(whatever)
//let BirdSighting = mongoose.model(whatever)
let jwt = require('express-jwt');
let auth = jwt({
	userProperty: 'payload',
	secret: 'secret'
});

router.post('/register', (req, res, next) => {
	if(!req.body.email || !req.body.password) return next('Please enter email and password.');
	let user = new User();
	user.local.email = req.body.email;

	//here we take the user's password input and transform it into an encrypted hash by calling the 'CreateHash' method that we defined in the UserSchema
	user.CreateHash(req.body.password, (err,hash) => {
		if(err) return next(err);
		user.local.password = hash;

		user.save((err,result) => {
			if(err) return next(err);
			if(!result) return next('Could not create user.');
			res.send({ token: result.generateJWT() });

		});
	});
});

router.post('/login', (req,res, next) => {
	passport.authenticate('local', (err, user) => {
		if(err) return next(err);
		res.send({ token: user.generateJWT() });
	})(req, res, next);
});



module.exports = router;
