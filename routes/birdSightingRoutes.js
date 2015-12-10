"use strict";
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let BirdSighting = mongoose.model('BirdSighting');
let Bird = mongoose.model('Bird');
let User = mongoose.model('User');
let jwt = require('express-jwt');
let auth = jwt({
  userProperty: 'payload',
  secret: 'secret'
});


// GET /api/v1/birdSighting
router.get('/', (req, res) => {
  BirdSighting.find({}).exec((err, result) => {
    if(err) return res.status(500).send(err);
    res.send(result);
  });
});

// POST /api/v1/birdSighting
router.post('/', (req, res) => {
  let new_birdSighting = new BirdSighting(req.body);
  new_birdSighting.save((err, result) => {
    if(err) return res.status(500).send("Error in the database.");
    if(!result) return res.status(400).send("Could not save the bird sighting. Check your fields.");
    res.send(result);
  });
});

// GET /api/v1/birdSighting/:id
router.get('/:id', (req, res) => {
  //mongoose method
  BirdSighting.findOne({ _id : req.params.id}).exec((err, result) => {
    if(err) return res.status(500).send(err);
    if(!result) return res.status(400).send("Could not find the bird sighting you want.");
    res.send(result);
  });
});

// PUT /api/v1/birdSighting/:id
router.put('/:id', (req, res) => {
 BirdSighting.update({ _id: req.params.id }, req.body, (err, result) => {
   if(err) res.status(500).send(err);
   res.send(result);
 });
});

// DELETE /api/v1/birdSighting/:id
router.delete('/:id', (req, res) => {
  BirdSighting.remove({ _id: req.params.id }, (err, result) => {
    if(err) return res.status(500).send(err);
    console.log(result);
    if(result.result.n !== 1) return res.status(500).send("Oops, Something went wrong.");
    res.send('Success');
  });
});

module.exports = router;
