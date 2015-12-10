'use strict';
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let Bird = mongoose.model('Bird');
let BirdSighting = mongoose.model('BirdSighting');
let jwt = require('express-jwt');
let auth = jwt({
  userProperty: 'payload',
  secret: 'birdnerd'
});

// GET /api/v1/birds/profile
router.get("/profile/", auth, (req, res, next) => {
  console.log('hi');
  Bird.find({ userName : req.payload._id })
  // .populate('userName', 'local.email')
  .exec((err, result) => {
    if(err) return next(err);
    res.send(result);
  });
});

// GET /api/v1/birds
router.get('/', (req, res, next) => {
  Bird.find({})
    .populate('userName', 'local.email')
    .exec((err, result) => {
      if(err) return next(err);
      res.send(result);
    });
});

// POST /api/v1/birds
router.post('/', auth, (req, res, next) => {
  let bird = new Bird(req.body);
  bird.userName = req.payload._id;
  bird.save((err, result) => {
    if(err) return next(err);
    if(!result) return next(`Could not create result`);
    User.update({ _id: req.payload._id }, { $push: { birds: result._id }}, (err, user) => {
      if(err) return next(err);
      if(!user) return next(`Could not push bird into user`);
      res.send(result);
    });
  });
});

// GET /api/v1/birds/:id
router.get('/:id', (req, res) => {
  Bird.findOne({ _id : req.params.id}).exec((err, result) => {
    if(err) return res.status(500).send(err);
    if(!result) return res.status(400).send("Couldn't find that bird.");
    res.send(result);
  });
});

// DELETE /api/v1/birds/:id
router.delete('/:id', auth, (req, res, next) => {
  let birdId = req.params.id;
  Bird.remove({ _id: req.params.id }, (err, result) => {
    if(err) return next(err);
    if(!result) return next(`Could not create result`);
    User.update({ _id: req.payload._id }, { $pull: { birds: birdId }}, (err, user) => {
      if(err) return next(err);
      if(!user) return next(`Could not remove bird from user`);
      res.send(result);
    });
  });
});

// PUT /api/v1/birds/:id
router.put('/:id', auth, (req, res) => {
    Bird.update({_id: req.params.id}, req.body, (err, result) => {
        if(err) res.status(500).send(err);
        res.send(result);
    });
});

module.exports = router;
