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

// GET /api/v1/questions/answers/:questionId
router.get('/:questionId', (req, res, next) => {
  AnAnswer.find({ questionName: req.params.questionId }, {})
    .populate('userName', 'local.userName')
    .exec((err, result) => {
      if(err) return next(err);
      res.send(result);
    });
});

// POST /api/v1/questions/answers/:questionId
router.post('/:questionId', auth, (req, res, next) => {
  let anAnswer = new AnAnswer(req.body);
  anAnswer.userName = req.payload._id;
  console.log("anAnswerRoutes.js:29 anAnswer.userName = ", anAnswer.userName);
  anAnswer.questionName = req.params.questionId;
  anAnswer.save((err, result) => {
    if(err) return next(err);
    if(!result) return next(`Could not create result`);
    User.update({ _id: req.payload._id }, { $push: { answers: result._id }}, (err, user) => {
      if(err) return next(err);
      if(!user) return next(`Could not push answer into user`);
      Question.update({ _id: req.params.questionId }, { $push: { answers: result._id}}, (err, user) => {
          if(err) return next(err);
          if(!user) return next(`Could not push the answer into question`);
          res.send(result);
      });
    });
  });
});

// GET /api/v1/questions/answers/update/:answerId
router.get('/update/:answerId', (req, res) => {
  AnAnswer.findOne({ _id : req.params.answerId}).exec((err, result) => {
    if(err) return res.status(500).send(err);
    if(!result) return res.status(400).send("Couldn't find that answer.");
    res.send(result);
  });
});

// DELETE /api/v1/answers/answers/:questionId/:answerId
router.delete('/:questionId/:answerId', auth, (req, res, next) => {
  let questionId = req.params.questionId;
  let answerId = req.params.answerId;
  AnAnswer.remove({ _id: req.params.answerId }, (err, result) => {
    if(err) return next(err);
    if(!result) return next(`Could not create result`);
    User.update({ _id: req.payload._id }, { $pull: { answers: answerId }}, (err, user) => {
      if(err) return next(err);
      if(!user) return next(`Could not remove answer from user`);
      Question.update({ _id: questionId }, { $pull: { answers: answerId }}, (err, user) => {
          if(err) return next(err);
          if(!user) return next(`Could not remove answer from question`);
          res.send(result);
      });
    });
  });
});

// PUT /api/v1/questions/answers/update/:answerId
router.put('/update/:answerId', auth, (req, res) => {
    AnAnswer.update({_id: req.params.answerId}, req.body, (err, result) => {
        if(err) res.status(500).send(err);
        res.send(result);
    });
});


module.exports = router;
