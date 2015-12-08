'use strict';
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let UserSchema = new mongoose.UserSchema({
  userName:   String,
  local: {              // the 'local' document contains an email address and a password
    email: {
      type: String,
      sparse: true,      // if email exists, it must be unique
      lowercase: true,  // convert the entered email address to lowercase
      trim: true,       // trims any whitespace from the end
      unique: true
      },
      //this password = hash, not user's actual
    password: String
  },
  birdSightings: [{type: mongoose.Schema.Types.ObjectId, ref: 'BirdSighting' }],
  birds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bird' }],
});

    UserSchema.methods.CreateHash = function(password, cb) {
        let SALT_ROUNDS = 10;
        if (process.env.NODE_ENV === 'test') SALT_ROUNDS=1;
        bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
            if(err) return cb(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) return cb(err);
                cb(null, hash);
            });
        });
    };

    UserSchema.methods.validatePassword = function(password, hash, cb) {
    bcrypt.compare(password, hash, function(err, res) {
        if(err) return cb(err);
        cb(null, res);
        });
    };

    UserSchema.methds.generateJWT = function() {
      return jwt.sign({
        _id: this._id,
        email: this.local.email
      }, 'secret');
    };
    
module.exports = mongoose.model('User', UserSchema);
