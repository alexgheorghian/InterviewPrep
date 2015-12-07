'use strict';
let mongoose = require('mongoose');

let BirdSchema = mongoose.Schema({
  description: String,
  imageUrl: String,
  dateCreated: { type: Date, default: Date.now },
  birdSightings: [{type: mongoose.Schema.Types.ObjectId, ref: 'BirdSighting' }],
  userName: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Bird', BirdSchema);
