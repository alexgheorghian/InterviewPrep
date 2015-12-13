'use strict';
let mongoose = require('mongoose');

let QuestionSchema = mongoose.Schema({
  name: String,
  description: String,
  dateCreated: { type: Date, default: Date.now },
  anAnswer: [{type: mongoose.Schema.Types.ObjectId, ref: 'AnAnswer' }],
  userName: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Question', QuestionSchema);
