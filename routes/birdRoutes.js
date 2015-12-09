'use strict';
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Bird = mongoose.model('Bird');
let User = mongoose.model('User');
let jwt = require('express-jwt');
let auth = jwt({
  userProperty: 'payload',
  secret: 'secret'
});

// GET /api/v1/birds
router.get('/', (req, res) => {
  Bird.find({})
    .exec((err, result) => {
    if(err) return res.status(500).send(err);
    res.send(result);
  });
});

// POST /api/v1/birds
router.post('/', (req, res) => {
  let bird = new Bird(req.body);
  bird.save((err, result) => {
    if(err) return res.status(500).send("Error in the database.");
    if(!result) return res.status(400).send("Could not save the bird.");
    res.send(result);
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
router.delete('/:id', (req, res) => {
  Bird.remove({ _id: req.params.id }, (err, result) => {
    if(err) return res.status(500).send(err);
    console.log(result);
    if(result.result.n !== 1) return res.status(500).send("Oops, something went wrong.");
    res.send('Success');
  });
});

// PUT /api/v1/birds/:id
router.put('/:id', (req, res) => {
    Bird.update({_id: req.params.id}, req.body, (err, result) => {
        if(err) res.status(500).send(err);
        res.send(result);
    });
});


module.exports = router;
