'use strict';
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let Question = mongoose.model('Question');
let AnAnswer = mongoose.model('AnAnswer');
let jwt = require('express-jwt');
let auth = jwt({
  userProperty: 'payload',
  secret: 'getajob'
});

// GET /api/v1/questions/profile
router.get("/profile/", auth, (req, res, next) => {
  Question.find({ userName : req.payload._id })
  // .populate('userName', 'local.email')
  .exec((err, result) => {
    if(err) return next(err);
    res.send(result);
  });
});

// GET /api/v1/questions
router.get('/', (req, res, next) => {
  Question.find({})
    .populate('userName', 'local.userName')
    .exec((err, result) => {
      if(err) return next(err);
      res.send(result);
    });
});

// POST /api/v1/questions
router.post('/', auth, (req, res, next) => {
  let question = new Question(req.body);
  question.userName = req.payload._id;
  question.save((err, result) => {
    if(err) return next(err);
    if(!result) return next(`Could not create result`);
    User.update({ _id: req.payload._id }, { $push: { questions: result._id }}, (err, user) => {
      if(err) return next(err);
      if(!user) return next(`Could not push question into user`);
      res.send(result);
    });
  });
});

// GET /api/v1/questions/:id
router.get('/:id', (req, res) => {
  Question.findOne({ _id : req.params.id})
  .populate('userName', 'local.userName')
  .exec((err, result) => {

    if(err) return res.status(500).send(err);
    if(!result) return res.status(400).send("Couldn't find that question.");
    res.send(result);
  });
});

// DELETE /api/v1/questions/:id
router.delete('/:id', auth, (req, res, next) => {
  let questionId = req.params.id;
  Question.remove({ _id: req.params.id }, (err, result) => {
    if(err) return next(err);
    if(!result) return next(`Could not create result`);
    User.update({ _id: req.payload._id }, { $pull: { questions: questionId }}, (err, user) => {
      if(err) return next(err);
      if(!user) return next(`Could not remove question from user`);
      res.send(result);
    });
  });
});

// PUT /api/v1/questions/:id
router.put('/:id', auth, (req, res) => {
    Question.update({_id: req.params.id}, req.body, (err, result) => {
        if(err) res.status(500).send(err);
        res.send(result);
    });
});

module.exports = router;
