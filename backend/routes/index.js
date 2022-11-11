var express = require('express');
const Participants = require('../models/participant');
var participantRouter = express.Router();

/* GET home page. */
participantRouter.get('/participants',(req, res) => {
  Participants.find().then((data) => {
    res.json(data);
  }).catch((e) => {
    console.log(e);
  })
});

module.exports = participantRouter;
