'use strict';
let mongoose = require('mongoose');
let BirdSightingSchema = mongoose.Schema({
  description: String,
  imageUrl: String,
  dateCreated: { type: Date, default: Date.now },
  userName: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  birdName: {type: mongoose.Schema.Types.ObjectId, ref: 'Bird' }
});
module.exports = mongoose.model('BirdSighting', BirdSightingSchema);
