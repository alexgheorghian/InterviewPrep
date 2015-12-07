'use strict';
let mongoose = require('mongoose');
let UserSchema = mongoose.Schema({
  userName:   String,
  local: {              // the 'local' document contains an email address and a password
    email: {
      type: String,
      sparse: true,      // if email exists, it must be unique
      lowercase: true,  // convert the entered email address to lowercase
      trim: true,       // trims any whitespace from the end
      unique: true
      },
    password: String
  },
  birdSightings: [{type: mongoose.Schema.Types.ObjectId, ref: 'BirdSighting' }],
  birds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bird' }],
});
module.exports = mongoose.model('User', UserSchema);
