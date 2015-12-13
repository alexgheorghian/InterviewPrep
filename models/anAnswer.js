'use strict';
let mongoose = require('mongoose');

let AnAnswerSchema = mongoose.Schema({
  description: String,
  dateCreated: { type: Date, default: Date.now },
  userName: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questionName: {type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
});

module.exports = mongoose.model('AnAnswer', AnAnswerSchema);
