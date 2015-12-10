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

// GET /api/v1/birds/sightings/:birdId
router.get('/:birdId', (req, res, next) => {
  BirdSighting.find({ birdName: req.params.birdId }, {})
    .populate('userName', 'local.email')
    .exec((err, result) => {
      if(err) return next(err);
      res.send(result);
    });
});

// POST /api/v1/birds/sightings/:birdId
router.post('/:birdId', auth, (req, res, next) => {
  let birdSighting = new BirdSighting(req.body);
  birdSighting.userName = req.payload._id;
  birdSighting.birdName = req.params.birdId;
  birdSighting.save((err, result) => {
    if(err) return next(err);
    if(!result) return next(`Could not create result`);
    User.update({ _id: req.payload._id }, { $push: { birdSightings: result._id }}, (err, user) => {
      if(err) return next(err);
      if(!user) return next(`Could not push bird sighting into user`);
      Bird.update({ _id: req.params.birdId }, { $push: { birdSightings: result._id}}, (err, user) => {
          if(err) return next(err);
          if(!user) return next(`Could not push bird sighting into bird`);
          res.send(result);
      });
    });
  });
});

// GET /api/v1/birds/sightings/update/:sightingId
router.get('/update/:sightingId', (req, res) => {
  BirdSighting.findOne({ _id : req.params.sightingId}).exec((err, result) => {
    if(err) return res.status(500).send(err);
    if(!result) return res.status(400).send("Couldn't find that bird sighting.");
    res.send(result);
  });
});

// DELETE /api/v1/birds/sightings/:birdId/:sightingId
router.delete('/:birdId/:sightingId', auth, (req, res, next) => {
  let birdId = req.params.birdId;
  let sightingId = req.params.sightingId;
  BirdSighting.remove({ _id: req.params.sightingId }, (err, result) => {
    if(err) return next(err);
    if(!result) return next(`Could not create result`);
    User.update({ _id: req.payload._id }, { $pull: { birdSightings: sightingId }}, (err, user) => {
      if(err) return next(err);
      if(!user) return next(`Could not remove bird sighting from user`);
      Bird.update({ _id: birdId }, { $pull: { birdSightings: sightingId }}, (err, user) => {
          if(err) return next(err);
          if(!user) return next(`Could not remove bird sighting from bird`);
          res.send(result);
      });
    });
  });
});

// PUT /api/v1/birds/sightings/update/:sightingId
router.put('/update/:sightingId', auth, (req, res) => {
    BirdSighting.update({_id: req.params.sightingId}, req.body, (err, result) => {
        if(err) res.status(500).send(err);
        res.send(result);
    });
});


module.exports = router;
