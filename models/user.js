'use strict';
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  local: {
    userName: String,
    email: {
      type: String,
      sparse: true,
      lowercase: true,
      trim: true,
      unique: true
    },
    password: String
  },
  birds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bird' }],
  birdSightings: [{type: mongoose.Schema.Types.ObjectId, ref: 'BirdSighting' }]
});

UserSchema.methods.CreateHash = function(password, cb) {
  let SALT_ROUNDS = 10;
  if (process.env.NODE_ENV === 'test') SALT_ROUNDS = 1;
  bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    if (err) return cb(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return cb(err);
      cb(null, hash);
    });
  });
};

UserSchema.methods.validatePassword = function(password, hash, cb) {
  bcrypt.compare(password, hash, function(err, res) {
    if(err) return cb(err);
    cb(null, res); //res should be true or false
  });
};

UserSchema.methods.generateJWT = function() {
  return jwt.sign({
    _id: this._id,
    email: this.local.email
}, "birdnerd");
};

module.exports = mongoose.model('User', UserSchema);
